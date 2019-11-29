'use strict';

const prettierConfig = require('./prettier');
const baseRules = require('./includes/eslint-base-rules');

module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended'
  ],
  rules: Object.assign(
    {
      'prettier/prettier': ['error', prettierConfig]
    },
    baseRules,
    {
      'no-console': 'off'
    }
  )
};
