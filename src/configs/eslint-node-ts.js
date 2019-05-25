'use strict';

const prettierConfig = require('./prettier');
const baseRules = require('./includes/eslint-base-rules');

module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  rules: Object.assign(
    {
      'prettier/prettier': ['error', prettierConfig]
    },
    baseRules
  )
};
