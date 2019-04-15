module.exports = {
  launch: {
    executablePath: process.env.IS_DOCKER ? '/usr/bin/chromium-browser' : '',
    headless: process.env.HEADLESS !== 'false',
    args: [
      ...['--lang=ja'],
      ...(process.env.IS_DOCKER
        ? ['--no-sandbox', '--disable-dev-shm-usage']
        : []),
    ],
    // NOTE: https://github.com/GoogleChrome/puppeteer/issues/1648
    slowMo: 10,
  },
  browserContext: 'incognito',
  server: {
    // NOTE: start with ts-node because ts-jest need tsconfig.json
    command: 'npm run build && npm run start:with_ts_node',
    port: process.env.NUXT_PORT ? Number(process.env.NUXT_PORT) : 3100,
    launchTimeout: 50000,
  },
};
