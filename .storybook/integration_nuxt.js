/* eslint @typescript-eslint/no-var-requires: 0 */

const path = require('path');
const fs = require('fs');
const cli = require('@nuxt/cli');
const hooks = require('@nuxt/typescript-runtime').hooks;
const webpack = require('webpack');

const nuxtBuildPath = `${path.resolve(__dirname)}/.nuxt`;

const getBuilder = async (nuxtConfigCustomizer) => {
  const cmd = await cli.commands.default('build');

  const cmdInstance = new cli.NuxtCommand(cmd, undefined, hooks);
  await cmdInstance.callHook('run:before', {
    argv: [],
    cmd,
    rootDir: path.resolve('.'),
  });

  const config = await cmdInstance.getNuxtConfig({
    dev: false,
    server: false,
    _build: true,
  });

  const nuxt = await cmdInstance.getNuxt(await nuxtConfigCustomizer(config));

  const builder = await cmdInstance.getBuilder(nuxt);
  await builder.nuxt.ready();
  await builder.nuxt.callHook('build:before', builder, builder.options.build);

  return builder;
};

const nuxtWebpackConfig = (builder) =>
  builder.bundleBuilder.getWebpackConfig('Client');

const generateNuxtTemplates = async (builder) => {
  builder.options.buildDir = nuxtBuildPath;

  await builder.validatePages();
  builder.validateTemplate();
  await builder.generateRoutesAndFiles();
  await fs.writeFileSync(
    `${nuxtBuildPath}/router.scrollBehavior.js`,
    'export default function() {}'
  );
};

exports.customizeWebpackConfig = async (
  originalConfig,
  _mode,
  nuxtConfigCustomizer = (config) => config
) => {
  const builder = await getBuilder(nuxtConfigCustomizer);

  const [nuxtWebpack] = await Promise.all([
    nuxtWebpackConfig(builder),
    generateNuxtTemplates(builder),
  ]);

  builder.nuxt.close(); // unnecessary wait

  const plugins = nuxtWebpack.plugins
    .filter(
      (plugin) =>
        ![
          'VueSSRClientPlugin', // => prevent output server/client.manifest.json
          'HtmlWebpackPlugin', // => prevent output server/index.{ssr|spa}.html
          'WebpackBarPlugin',
        ].includes(plugin.constructor.name)
    )
    .concat(
      new webpack.ProvidePlugin({
        StoryBookNuxtIntegrationVuex: `${nuxtBuildPath}/store`,
        StoryBookNuxtIntegrationRouter: `${nuxtBuildPath}/router`,
      })
    );

  originalConfig.plugins = originalConfig.plugins
    .filter((plugin) => plugin.constructor.name !== 'VueLoaderPlugin')
    .concat(plugins);

  originalConfig.module.rules = originalConfig.module.rules
    .filter((rule) => rule.test.test('.md'))
    .concat(nuxtWebpack.module.rules);

  originalConfig.resolve.alias = {
    ...originalConfig.resolve.alias,
    ...nuxtWebpack.resolve.alias,
  };

  originalConfig.resolve.extensions = originalConfig.resolve.extensions.concat(
    nuxtWebpack.resolve.extensions
  );

  originalConfig.performance = { hints: false };
  originalConfig.devtool = nuxtWebpack.devtool;
  originalConfig.optimization = nuxtWebpack.optimization;

  return originalConfig;
};
