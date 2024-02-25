module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': [
      'error',
      {
        'code': 120,
        'ignoreUrls': true,
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreRegExpLiterals': true
      }
    ],
    'indent': 'off',
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'object-curly-spacing': [
      'error',
      'always',
      {
        'arraysInObjects': true
      }
    ],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'prefer-const': 'error',
    'no-use-before-define': 'error',
    'no-trailing-spaces': 'error',
    'no-console': 'warn'
  },
};
