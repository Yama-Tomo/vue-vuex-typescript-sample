const path = require('path');

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

module.exports = {
  productionSourceMap: false,
  configureWebpack: config => {
    config.entry = './src/index.ts';
    config.output.filename = 'index.js';
    config.output.path = path.resolve(__dirname, './dist');

    config.plugins.unshift(new IgnoreNotFoundExportPlugin())
  }
}
