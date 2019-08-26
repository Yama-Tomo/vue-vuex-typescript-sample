const path = require('path');
const cli = require('@nuxt/cli');
const cmd = new cli.NuxtCommand(undefined, ['--config-file', path.resolve('./nuxt.config.ts')]);
const webpack = require('webpack');

const nuxtBuildPath = `${path.resolve(__dirname)}/.nuxt`;

const setupNuxtTs = () => {
  const runtime = require('@nuxt/typescript-runtime');
  const rootDir = runtime.getRootdirFromArgv();
  const tsConfigPath = path.resolve(rootDir, 'tsconfig.json');
  runtime.registerTSNode(tsConfigPath)
};

const getBuilder = async (nuxtConfigCustomizer) => {
  const config = await cmd.getNuxtConfig({ dev: false, _build: true });
  const nuxt = await cmd.getNuxt(await nuxtConfigCustomizer(config));
  nuxt.close(); // unnecessary wait

  return cmd.getBuilder(nuxt);
};

const nuxtWebpackConfig = async (nuxtConfigCustomizer) =>
  (await getBuilder(nuxtConfigCustomizer)).getBundleBuilder().getWebpackConfig('Client');

const generateNuxtTemplates = async (nuxtConfigCustomizer) => {
  const builder = await getBuilder(nuxtConfigCustomizer);

  builder.options.buildDir = nuxtBuildPath;
  await builder.validatePages();
  await builder.generateRoutesAndFiles();
};

exports.customizeWebpackConfig = async (originalConfig, mode, nuxtConfigCustomizer = async (config) => config) => {
  setupNuxtTs();

  const [nuxtWebpack] = await Promise.all([
    nuxtWebpackConfig(nuxtConfigCustomizer),
    generateNuxtTemplates(nuxtConfigCustomizer)
  ]);

  const plugins = nuxtWebpack.plugins
    .filter(
      plugin =>
        ![
          'VueSSRClientPlugin', // => prevent output server/client.manifest.json
          'HtmlWebpackPlugin',  // => prevent output server/index.{ssr|spa}.html
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
    .filter(plugin => plugin.constructor.name !== 'VueLoaderPlugin')
    .concat(plugins);

  originalConfig.module.rules = originalConfig.module.rules.concat(rules);
  originalConfig.resolve.alias = {
    ...originalConfig.resolve.alias,
    ...nuxtWebpack.resolve.alias
  };

  originalConfig.resolve.extensions = originalConfig.resolve.extensions.concat(nuxtWebpack.resolve.extensions);

  return originalConfig;
};
