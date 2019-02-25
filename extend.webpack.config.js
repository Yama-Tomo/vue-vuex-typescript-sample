const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const defaultConfigHash       = require('hard-source-webpack-plugin/lib/defaultConfigHash')

// https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('warnfix-plugin', (stats) => {
      const messageRegExp = /export .* was not found in/
      stats.compilation.warnings = stats.compilation.warnings.filter((warn) => {
        if (warn.name === 'ModuleDependencyWarning' && messageRegExp.test(warn.message)) {
          return false
        }
        return true
      })
    })
  }
}

module.exports = function(config, ctx) {
  const useVueI18nLoader = (() => {
    const nuxtI18n = this.context.options.modules.find((module) => {
      if (Array.isArray(module) ) {
        return module[0] === 'nuxt-i18n'
      }
      return false
    })

    return nuxtI18n !== undefined && !!nuxtI18n[1].vueI18nLoader
  })()

  if (useVueI18nLoader) {
    config.module.rules.push({
      resourceQuery: /blockType=i18n/,
      type: 'javascript/auto',
      loader: ['@kazupon/vue-i18n-loader', 'yaml-loader']
    })
  } else {
    config.module.rules.push({
      test: /\.ya?ml$/,
      loaders: ['json-loader', 'yaml-loader']
    })
  }

  config.plugins.push(new IgnoreNotFoundExportPlugin())

  config.plugins.push(new HardSourceWebpackPlugin({
    cacheDirectory: __dirname + '/node_modules/.cache/hard-source/[confighash]',
    configHash: function(webpackConfig) {
      return defaultConfigHash(webpackConfig) + '-' + process.env.NODE_ENV
    },
  }))

  config.plugins.push(new HardSourceWebpackPlugin.ExcludeModulePlugin([
    { test: /extract-css-chunks-webpack-plugin[\\/]dist[\\/]hotLoader/ }
  ]))
}