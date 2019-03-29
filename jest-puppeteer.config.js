module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
    args: [
      ...['--lang=ja'],
      ...process.env.IS_DOCKER ? ['--no-sandbox', '--disable-dev-shm-usage'] : [],
    ],
    // NOTE: https://github.com/GoogleChrome/puppeteer/issues/1648
    slowMo: 10,
  },
  browserContext: 'incognito',
  server: {
    command: 'npm run dev',
    port: process.env.NUXT_PORT ? Number(process.env.NUXT_PORT) : 3100,
    launchTimeout: 50000,
  },
};
