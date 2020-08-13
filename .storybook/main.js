// eslint-disable-next-line @typescript-eslint/no-var-requires
const { customizeWebpackConfig } = require('./integration_nuxt');

module.exports = {
  stories: ['../stories/**/*.story.@(tsx|mdx|vue)'],
  webpackFinal: (config, { configType }) => {
    return customizeWebpackConfig(config, configType, (nuxtConfig) => ({
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
  },
};
