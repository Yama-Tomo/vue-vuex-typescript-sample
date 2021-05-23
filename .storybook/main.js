// eslint-disable-next-line @typescript-eslint/no-var-requires
const { customizeWebpackConfig } = require('./integration_nuxt');

module.exports = {
  stories: ['../stories/**/*.story.@(tsx|mdx|vue)'],
  features: {
    postcss: false,
  },
  babel: ({ presets }) => {
    const isBabelPresetEnv = (preset) =>
      (Array.isArray(preset) ? preset[0] : preset).includes(
        '@babel/preset-env'
      );
    const babelPresetEnv = presets.find(isBabelPresetEnv);

    if (babelPresetEnv) {
      babelPresetEnv[1].shippedProposals = false;
    }
  },
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
