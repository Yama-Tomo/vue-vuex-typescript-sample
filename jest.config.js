module.exports = {
  preset: 'jest-puppeteer',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
    url: {
      base: process.env.base_url ? process.env.base_url : `http://localhost:${process.env.NUXT_PORT || 3100}`,
    },
    timeout: 30000,
    user: {
      email: process.env.user_email || '',
      password: process.env.user_password || '',
    },
  },
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*_test.[jt]s?(x)'],
  testPathIgnorePatterns: ['node_modules', '__api'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
};
