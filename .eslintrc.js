// NOTE: how to apply eslint on intellij https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000225170-ESLint-and-ts-Typescript-files
module.exports = {
  root: true,
  plugins: ['babel', 'prettier'],
  // parser: 'vue-eslint-parser', # This configuration is not necessary. @nuxtjs/eslint-config-typescript => @nuxtjs/eslint-config => eslint-plugin-vue
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    // relate issues: https://github.com/typescript-eslint/typescript-eslint/issues/404, https://github.com/mysticatea/vue-eslint-parser/issues/45
    //    project: './tsconfig.json',
    //    extraFileExtensions: ['.vue']
  },
  rules: {
    semi: 'off',
    'babel/semi': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      { allowSingleExtends: true },
    ],
    // https://github.com/eslint/eslint/issues/12058
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
        functions: 'never',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    //    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
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
    StoryBookNuxtIntegrationVuex: true,
    StoryBookNuxtIntegrationRouter: true,
  },
};
