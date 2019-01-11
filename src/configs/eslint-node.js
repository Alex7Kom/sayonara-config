'use strict';

const prettierConfig = require('./prettier');
const baseRules = require('./includes/eslint-base-rules');

module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 8
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: Object.assign(
    {
      'prettier/prettier': ['error', prettierConfig]
    },
    baseRules
  )
};
