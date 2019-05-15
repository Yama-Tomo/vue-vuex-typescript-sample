import bodyParser from 'body-parser';
import passThroughMiddleware from './src/server_middleware/pass_through';
import extendWebpackConfig from './extend.webpack.config';

const port = process.env.NUXT_PORT || 3100;
const host = process.env.NUXT_HOST || '0.0.0.0';
const isDev = process.env.NODE_ENV === 'development';

export default {
  server: {
    host,
    port,
  },
  env: {
    baseUrl: process.env.BASE_URL || `http://${host}:${port}`,
  },
  srcDir: 'src',
  head: {
    title: 'nuxt.js with typescript',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: { color: '#3B8070' },
  css: ['~/assets/css/main.scss'],
  build: {
    extractCSS: !isDev,
    extend: extendWebpackConfig,
  },
  watch: ['~/serverMiddleware/*.ts'],
  hooks: {
    ready: (nuxt: any) => {
      process.on('SIGINT', () => {
        // eslint-disable-next-line no-console
        console.log('received sigint signal');
        nuxt.close(() => {
          process.exit(0);
        });
      });
    },
    listen: () => {
      if (typeof process.send === 'function') {
        // eslint-disable-next-line no-console
        console.log('process send ready');
        process.send('ready');
      }
    },
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'nuxt-i18n',
      {
        parsePages: false,
        defaultLocale: 'en',
        rootRedirect: 'en',
        lazy: true,
        locales: [
          { code: 'en', iso: 'en-US', file: 'en.ts' },
          { code: 'ja', iso: 'ja', file: 'ja.ts' },
        ],
        langDir: 'i18n/',
        strategy: 'prefix',
        detectBrowserLanguage: false,
      },
    ],
  ],
  plugins: [
    '~/plugins/axios_cookie_proxy.ts',
    { src: '~/plugins/external_lib_import.ts', ssr: false },
  ],
  axios: {
    host,
    port,
    prefix: '/api',
    proxy: true,
  },
  proxy: {
    '/api': process.env.BACKEND_HOST || 'http://localhost:3101',
  },
  auth: {
    plugins: ['~/plugins/auth/redirect.ts'],
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/sign_in' },
          logout: { url: '/users/sign_out', method: 'delete' },
          user: { url: '/users/show', propertyName: 'user' },
        },
        tokenRequired: false,
      },
    },
    rewriteRedirects: false,
    fullPathRedirect: true,
  },
  router: {
    middleware: ['auth'],
  },
  serverMiddleware: [
    bodyParser.urlencoded({ extended: true }),
    passThroughMiddleware,
  ],
};
