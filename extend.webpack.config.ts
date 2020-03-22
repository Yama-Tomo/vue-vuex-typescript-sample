import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import { Configuration as NuxtConfiguration } from '@nuxt/types';
import VuetifyJsxLoader from 'vuetify-jsx-loader';

const defaultConfigHash: (
  config: WebpackConfiguration
) => /* eslint-disable-next-line @typescript-eslint/no-var-requires */
string = require('hard-source-webpack-plugin/lib/defaultConfigHash');

type BuildConfiguration = NonNullable<NuxtConfiguration['build']>;
type Args = Parameters<NonNullable<BuildConfiguration['extend']>>;
export default function (...args: Args) {
  const config = args[0];

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

    config.plugins.push(new VuetifyJsxLoader());
  }
}
