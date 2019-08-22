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

  const excludeNuxtRules = ['/\\.vue$/i', '/\\.scss$/i'];
  const rules = nuxtWebpack.module.rules
    .filter(rule => !excludeNuxtRules.includes(rule.test.toString()))
    .concat({
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    });

  const pickNuxtPlugin = ['WarningIgnorePlugin', 'ForkTsCheckerWebpackPlugin'];
  const plugins = nuxtWebpack.plugins
   .filter(plugin => pickNuxtPlugin.includes(plugin.constructor.name))
   .concat(
     new webpack.ProvidePlugin({
       StoryBookNuxtIntegrationVuex: `${nuxtBuildPath}/store`,
       StoryBookNuxtIntegrationRouter: `${nuxtBuildPath}/router`,
     }),
   );

  originalConfig.plugins = originalConfig.plugins.concat(plugins);
  originalConfig.module.rules = originalConfig.module.rules.concat(rules);
  originalConfig.resolve.alias = {
    ...originalConfig.resolve.alias,
    ...nuxtWebpack.resolve.alias
  };

  originalConfig.resolve.extensions = originalConfig.resolve.extensions.concat(nuxtWebpack.resolve.extensions);

  return originalConfig;
};
