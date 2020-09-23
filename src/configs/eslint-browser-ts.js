'use strict';

module.exports = {
  overrides: [
    {
      files: ['*.ts?(x)'],
      extends: ['./eslint/env-browser-ts.js'],
    },
  ],
};
