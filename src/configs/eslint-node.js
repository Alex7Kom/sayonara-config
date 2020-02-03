'use strict';

module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: [
    './eslint-base.js',
    'plugin:node/recommended',
    './eslint-prettier.js',
    './eslint-jsdoc.js'
  ],
  rules: {
    'no-console': 'off'
  }
};
