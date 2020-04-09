'use strict';

const { addNpmScript } = require('../../helpers/npm-scripts');
const { addEslintIgnore } = require('../../helpers/eslint-config');
const createTsConfig = require('../tsconfig');

module.exports = function () {
  createTsConfig(
    {
      extends: './tsconfig',
      exclude: ['**/*.test.js', '**/*.test.jsx', 'jest.config.js'],
      compilerOptions: {
        declaration: true,
        noEmit: false,
        emitDeclarationOnly: true,
      },
    },
    'd.tsconfig.json'
  );

  addNpmScript('build:dts', 'tsc -p d.tsconfig.json');

  addEslintIgnore('src/**/*.d.ts');
};
