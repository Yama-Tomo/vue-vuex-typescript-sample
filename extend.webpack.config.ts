import * as path from 'path';
import { Configuration } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

const defaultConfigHash: (
  config: Configuration
) => string = require('hard-source-webpack-plugin/lib/defaultConfigHash');

export default function(config: Configuration) {
  config.externals = {
    jquery: 'jQuery',
  };

  const useVueI18nLoader = (() => {
    // @ts-ignore
    // TODO: remove any
    const nuxtI18n = (this as any).buildContext.options.modules.find(
      (module: unknown) => {
        if (Array.isArray(module)) {
          return module[0] === 'nuxt-i18n';
        }
        return false;
      }
    );

    return nuxtI18n !== undefined && !!nuxtI18n[1].vueI18nLoader;
  })();

  if (config.module) {
    if (useVueI18nLoader) {
      config.module.rules.push({
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: ['@kazupon/vue-i18n-loader', 'yaml-loader'],
      });
    } else {
      config.module.rules.push({
        test: /\.ya?ml$/,
        loaders: ['json-loader', 'yaml-loader'],
      });
    }
  }

  if (config.plugins) {
    config.plugins = config.plugins.filter(
      p => p.constructor.name !== 'ForkTsCheckerWebpackPlugin'
    );

    config.plugins.push(
      new HardSourceWebpackPlugin({
        cacheDirectory: path.resolve(
          './node_modules/.cache/hard-source/[confighash]'
        ),
        configHash: (webpackConfig?: Configuration) =>
          (webpackConfig ? defaultConfigHash(webpackConfig) : '') +
          `-${process.env.NODE_ENV}`,
      })
    );

    config.plugins.push(
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        { test: /extract-css-chunks-webpack-plugin[\\/]dist[\\/]loader/ },
      ])
    );
  }
}
