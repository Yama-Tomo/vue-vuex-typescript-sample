import * as path from 'path';
import { Configuration, Compiler } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

// tslint:disable-next-line:no-var-requires
const defaultConfigHash = require('hard-source-webpack-plugin/lib/defaultConfigHash');

// https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335
class IgnoreNotFoundExportPlugin {
  public apply(compiler: Compiler) {
    compiler.hooks.done.tap('warnfix-plugin', stats => {
      const messageRegExp = /export .* was not found in/;
      stats.compilation.warnings = stats.compilation.warnings.filter(warn => {
        return !(
          warn.name === 'ModuleDependencyWarning' &&
          messageRegExp.test(warn.message)
        );
      });
    });
  }
}

export default function(config: Configuration) {
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
    config.plugins.push(new IgnoreNotFoundExportPlugin());
    config.plugins.push(
      new HardSourceWebpackPlugin({
        cacheDirectory: path.resolve(
          './node_modules/.cache/hard-source/[confighash]'
        ),
        configHash: (webpackConfig?: Configuration) =>
          defaultConfigHash(webpackConfig) + '-' + process.env.NODE_ENV,
      })
    );

    config.plugins.push(
      new (HardSourceWebpackPlugin as any).ExcludeModulePlugin([
        { test: /extract-css-chunks-webpack-plugin[\\/]dist[\\/]loader/ },
      ])
    );
  }
}
