'use strict';

module.exports = {
  extends: ['./jsdoc.js'],
  rules: {
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
    'jsdoc/no-types': 'error',
  },
};
