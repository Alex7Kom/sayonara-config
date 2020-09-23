'use strict';

module.exports = {
  overrides: [
    {
      files: ['*.test.js?(x)'],
      extends: ['./eslint/env-node.js', './eslint/jest.js'],
    },
    {
      files: ['*.test.ts?(x)'],
      extends: ['./eslint-node-ts.js', './eslint/jest.js'],
    },
    {
      files: ['jest.config.js'],
      extends: ['./eslint/env-node.js'],
    },
  ],
};
