'use strict';

module.exports = {
  overrides: [
    {
      files: ['*.?(test|spec).js?(x)'],
      env: {
        jest: true
      },
      extends: ['./eslint-node.js']
    },
    {
      files: ['*.?(test|spec).ts?(x)'],
      env: {
        jest: true
      },
      extends: ['./eslint-node-ts.js']
    },
    {
      files: ['jest.config.js'],
      extends: ['./eslint-node.js']
    }
  ]
};
