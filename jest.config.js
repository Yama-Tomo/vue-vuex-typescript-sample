const config = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
    'vue-jest': {
      babelConfig: {
        presets: [
          ['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
          '@vue/babel-preset-jsx',
        ],
        plugins: ['rewire'],
      },
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
  collectCoverage: false,
  collectCoverageFrom: ['./src/**', '!./src/i18n/**', '!./src/store/**'],
  snapshotSerializers: ['jest-serializer-vue'],
};

const isNeedPuppeteer =
  !process.argv.filter(arg => arg.includes('__tests__/')).length ||
  process.argv.filter(arg => arg.includes('__tests__/e2e')).length;

if (isNeedPuppeteer) {
  config.preset = 'jest-puppeteer';
}

module.exports = config;
