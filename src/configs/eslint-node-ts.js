'use strict';

module.exports = {
  extends: ['./eslint-node.js', './eslint-ts.js', './eslint-prettier-ts.js'],
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        ignores: ['modules']
      }
    ]
  }
};
