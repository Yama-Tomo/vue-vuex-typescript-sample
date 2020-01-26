// NOTE: how to apply eslint on intellij https://intellij-support.jetbrains.com/hc/en-us/community/posts/115000225170-ESLint-and-ts-Typescript-files
module.exports = {
  root: true,
  plugins: ['babel', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    semi: 'off',
    'babel/semi': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }],
    "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true } ],
    // https://github.com/eslint/eslint/issues/12058
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'exports': 'always-multiline',
      'imports': 'always-multiline',
      'objects': 'always-multiline',
      'functions': 'never',
    }],
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': 'es5'
      }
    ]
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier',
    'prettier/babel',
    'prettier/vue',
  ]
}