/* eslint @typescript-eslint/no-var-requires: 0 */

const { customizeWebpackConfig } = require('./integration_nuxt');

module.exports = ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  return customizeWebpackConfig(config, mode, (nuxtConfig) => ({
    ...nuxtConfig,
    ...{
      build: {
        ...nuxtConfig.build,
        ...{
          // NOTE: prevent chunk files by `@nuxt/vue-app/template/router.js`
          splitChunks: { layouts: false, pages: false, commons: false },
        },
      },
      hooks: {},
    },
  }));
};
