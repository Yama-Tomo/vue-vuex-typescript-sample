const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HardSourceWebpackPlugin    = require('hard-source-webpack-plugin')

// https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335
class IgnoreNotFoundExportPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('warnfix-plugin', (stats) => {
      const messageRegExp = /export '.* was not found in/
      stats.compilation.warnings = stats.compilation.warnings.filter((warn) => {
        if (warn.name === 'ModuleDependencyWarning' && messageRegExp.test(warn.message)) {
          return false
        }
        return true
      })
    })
  }
}

module.exports = function() {
  this.nuxt.options.extensions.push('ts')

  this.extendBuild(config => {
    const tsLoader = {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      },
    }

    config.module.rules.push(
      Object.assign(
        { test: /((client|server)\.js)|(\.tsx?)$/ },
        tsLoader
      )
    )

    const vueLoader = config.module.rules.find(el => el.loader === 'vue-loader')
    if (vueLoader !== undefined) {
      vueLoader.options.loaders = vueLoader.options.loaders || {}
      vueLoader.options.loaders.ts = tsLoader
    }

    if (this.requiredModules['nuxt-i18n'] && this.requiredModules['nuxt-i18n'].options.vueI18nLoader) {
      // NOTE: no correctly detect vue-loader version on nuxt-18n when added property for typescript build to loader.options.loaders
      // manually add module rules for vue-loader after 15.0.0
      config.module.rules.push({
        resourceQuery: /blockType=i18n/,
        loader: ['@kazupon/vue-i18n-loader', 'yaml-loader']
      })
    }

    if (config.resolve.extensions.indexOf('.ts') === -1) {
      config.resolve.extensions.push('.ts')
    }

    if (config.name === 'client') {
      config.plugins.push(new ForkTsCheckerWebpackPlugin({
        workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
        tslint: true,
        vue: true,
        logger: consola,
      }))
    }

    config.plugins.push(new IgnoreNotFoundExportPlugin())
    config.plugins.push(new HardSourceWebpackPlugin({
      cacheDirectory: path.resolve(__dirname, '../../node_modules/.cache/hard-source/[confighash]')
    }))
  })
}