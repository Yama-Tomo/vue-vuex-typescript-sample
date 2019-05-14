const config = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
    url: {
      base: process.env.base_url
        ? process.env.base_url
        : `http://localhost:${process.env.NUXT_PORT || 3100}`,
    },
    timeout: 60000,
    user: {
      email: process.env.user_email || '',
      password: process.env.user_password || '',
    },
  },
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*_test.[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', '__api'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'vue'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  snapshotSerializers: ['jest-serializer-vue'],
};

const isNeedPuppeteer =
  !process.argv.filter(arg => arg.indexOf('__tests__/') !== -1).length ||
  process.argv.filter(arg => arg.indexOf('__tests__/e2e') !== -1).length;

if (isNeedPuppeteer) {
  config.preset = 'jest-puppeteer';
}

module.exports = config;
