import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import consola from 'consola';
import { Configuration as NuxtConfiguration } from '@nuxt/types';

const defaultConfigHash: (
  config: WebpackConfiguration
) => /* eslint-disable-next-line @typescript-eslint/no-var-requires */
string = require('hard-source-webpack-plugin/lib/defaultConfigHash');

type BuildConfiguration = NonNullable<NuxtConfiguration['build']>;
type Args = Parameters<NonNullable<BuildConfiguration['extend']>>;
export default function(...args: Args) {
  const config = args[0];
  const ctx = args[1];

  config.externals = {
    jquery: 'jQuery',
  };

  if (config.module) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      loaders: ['json-loader', 'yaml-loader'],
    });
  }

  if (config.plugins) {
    config.plugins = config.plugins.filter(
      p => p.constructor.name !== 'ForkTsCheckerWebpackPlugin'
    );

    if (ctx.isClient) {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          vue: true,
          tsconfig: path.resolve('tsconfig.json'),
          eslint: true,
          formatter: 'codeframe',
          logger: consola,
        })
      );
    }

    config.plugins.push(
      new HardSourceWebpackPlugin({
        cacheDirectory: path.resolve(
          './node_modules/.cache/hard-source/[confighash]'
        ),
        configHash: (webpackConfig?: WebpackConfiguration) =>
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
