'use strict';

module.exports = {
  env: {
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 5,
  },
  extends: ['./base.js', './prettier.js', './jsdoc.js'],
};
