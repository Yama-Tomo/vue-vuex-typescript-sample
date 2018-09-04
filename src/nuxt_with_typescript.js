const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = function() {
  this.nuxt.options.extensions.push('ts')

  this.extendBuild(config => {
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      },
    };

    config.module.rules.push(
      Object.assign(
        { test: /((client|server)\.js)|(\.tsx?)$/ },
        tsLoader
      )
    );

    for (let rule of config.module.rules) {
      if (rule.loader === 'vue-loader') {
        rule.options.loaders = rule.options.loaders || {};
        rule.options.loaders.ts = tsLoader;
      }
    }

    if (config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts')
    }

    config.plugins.push(new ForkTsCheckerWebpackPlugin({
      workers: 2,
      tslint: true,
      vue: true,
    }));

    if (config.entry.app && config.entry.app instanceof Array) {
      // https://github.com/webpack-contrib/webpack-hot-middleware#config
      config.entry.app = config.entry.app.map((entry) => entry.replace(/webpack-hot-middleware\/client\?/, 'webpack-hot-middleware/client?quiet=true&'));
    }

    const friendlyErrorsWebpackPlugin = config.plugins.find((plugin) => plugin.constructor.name === 'FriendlyErrorsWebpackPlugin');
    if (friendlyErrorsWebpackPlugin) {
      (friendlyErrorsWebpackPlugin.logLevel  = 2);
    }
  })
}