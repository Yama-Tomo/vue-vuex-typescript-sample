// NOTE: how to apply eslint on intellij https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000225170-ESLint-and-ts-Typescript-files
module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'babel', 'prettier', 'standard'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    semi: 'off',
    'babel/semi': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': 'es5'
      }
    ]
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/babel',
    'prettier/vue',
  ],
  env: {
    jest: true,
  },
  globals: {
    page: true,
    browser: true,
    context: true,
    jestPuppeteer: true,
    url: true,
    user: true,
    timeout: true,
  },
}

