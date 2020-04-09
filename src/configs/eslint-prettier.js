'use strict';

const prettierConfig = require('./prettier');

module.exports = {
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error', prettierConfig],
  },
};
