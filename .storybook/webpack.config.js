const path = require('path');
const cli = require('@nuxt/cli');
const cmd = new cli.NuxtCommand(undefined, ['--config-file' , path.resolve('./nuxt.config.ts')]);

async function nuxtWebpackConfig() {
  const config = await cmd.getNuxtConfig({ dev: false, _build: true });
  const nuxt = await cmd.getNuxt(config);
  const builder = await cmd.getBuilder(nuxt);
  return builder.getBundleBuilder().getWebpackConfig('Client');
}

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  const nuxtWebpack = await nuxtWebpackConfig();

  const excludeNuxtRules = ['/\\.vue$/i', '/\\.jsx?$/i', '/\\.scss$/i'];
  const rules = nuxtWebpack.module.rules
    .filter(rule => !excludeNuxtRules.includes(rule.test.toString()))
    .concat({
      test: /\.s?css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    });

  const plugins = nuxtWebpack.plugins
    .filter(plugin => ['WarningIgnorePlugin', 'ForkTsCheckerWebpackPlugin'].includes(plugin.constructor.name));

  config.plugins = config.plugins.concat(plugins);
  config.module.rules = config.module.rules.concat(rules);
  config.resolve.alias = {
    ...config.resolve.alias,
    ...nuxtWebpack.resolve.alias
  };
  config.resolve.extensions = config.resolve.extensions.concat(nuxtWebpack.resolve.extensions);

  return config;
};
