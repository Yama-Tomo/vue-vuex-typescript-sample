import * as path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import VuetifyJsxLoader from 'vuetify-jsx-loader';
import { ExtendBuildArgs } from './src/types/nuxt_module';

const defaultConfigHash: (
  config: WebpackConfiguration
) => /* eslint-disable-next-line @typescript-eslint/no-var-requires */
string = require('hard-source-webpack-plugin/lib/defaultConfigHash');

export default function (...args: ExtendBuildArgs) {
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
