'use strict';

module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    './base.js',
    'plugin:node/recommended',
    './prettier.js',
    './jsdoc.js',
  ],
  rules: {
    'no-console': 'off',
  },
};
