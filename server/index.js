#!/usr/bin/env node

const packageJson = require('../package.json')
process.env.npm_package_config_nuxt_host = packageJson.config.nuxt.host
process.env.npm_package_config_nuxt_port = packageJson.config.nuxt.port

const { NuxtCommand, commands, setup } = require('@nuxt/cli')
const { showBanner } = require('@nuxt/cli/dist/cli-chunk2')

async function start() {
  setup({ dev: false })

  const cmd = await commands.default('start')
  // NOTE: override function
  cmd.run = async (command) => {
    const config = await command.getNuxtConfig({ dev: false, _start: true })
    const nuxt = await command.getNuxt(config)

    nuxt.hook('listen', async (server, listener) => {
      showBanner(nuxt)

      if (typeof process.send === 'function') {
        process.send('ready')
      }
    })

    if (typeof process.on === 'function') {
      process.on('SIGINT', () => {
        console.log('received sigint signal')
        nuxt.close()
      })
    }

    await nuxt.server.listen()
  }

  return NuxtCommand.run(cmd)
}

start()
