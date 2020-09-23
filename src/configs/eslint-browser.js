'use strict';

module.exports = {
  overrides: [
    {
      files: ['*.js?(x)'],
      extends: ['./eslint/env-browser.js'],
    },
  ],
};
