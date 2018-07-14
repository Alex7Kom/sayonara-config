'use strict';

const prettierConfig = require('./prettier');
const baseRules = require('./includes/eslint-base-rules');

module.exports = {
  parserOptions: {
    ecmaVersion: 5
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
