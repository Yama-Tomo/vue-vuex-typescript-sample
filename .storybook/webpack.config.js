const { customizeWebpackConfig } = require('./integration_nuxt');

module.exports = ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  return customizeWebpackConfig(config, mode, async (nuxtConfig) => ({
    ...nuxtConfig,
    ...{ hooks: {} }
  }));
};
