const parseArgs = require('minimist')
const argv = parseArgs(process.argv.slice(2), {
  alias: {
    H: 'hostname',
    p: 'port'
  },
  string: ['H'],
  unknown: parameter => false
})

const port = argv.port || process.env.PORT || process.env.npm_package_config_nuxt_port || '3100'
const host = argv.hostname || process.env.HOST || process.env.npm_package_config_nuxt_host || 'localhost'

module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`
  },
  srcDir: 'src',
  head: {
    title: 'nuxt.js with typescript',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: ['~/assets/css/main.scss'],
  build: {
    extractCSS: { allChunks: true },
  },
  modules: [
    '~/nuxt_with_typescript.js',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-i18n', {
      parsePages: false,
      defaultLocale: 'en',
      // TODO: https://github.com/nuxt/nuxt.js/issues/3957
      seo: false,
      locales: [{
        code: 'en',
        iso: 'en-US'
      }, {
        code: 'ja',
        iso: 'ja'
      }],
      strategy: 'prefix',
      detectBrowserLanguage: {
        useCookie: false
      },
      vueI18nLoader: true,
    }],
  ],
  axios: {
    prefix: '/api',
    proxy: true,
  },
  proxy: {
    '/api': 'http://localhost:3101'
  },
  auth: {
    plugins: ['~/plugins/auth/redirect.js'],
    strategies: {
      local: {
        endpoints: {
          login:  { url: '/users/sign_in' },
          logout: { url: '/users/sign_out', method: 'delete' },
          user:  { url: '/users/show', propertyName: 'user' },
        }
      }
    },
    redirect: {
      home: '/'
    }
  },
  router: {
    middleware: ['auth']
  },
}
