'use strict';

const path = require('path');

const { addFileFromTemplate } = require('../../helpers/fs-utils');
const { updatePackageInfo } = require('../../helpers/package-json');
const {
  prepareEslintConfig,
  appendEslintExtend,
  removeEslintExtend
} = require('../../helpers/eslint-config');
const { addNpmScript } = require('../../helpers/npm-scripts');

function addJest() {
  addJestConfig();

  addNpmScript('test:jest', 'jest');
  addNpmScript('test', 'run-s test:*');

  addEslintOverride();
}

function addJestConfig() {
  const rcFile = 'jest.config.js';
  const templatePath = path.join(__dirname, 'jest.config.tpl.js');
  addFileFromTemplate(rcFile, templatePath);
}

function addEslintOverride() {
  prepareEslintConfig();
  removeEslintExtend('jest');
  appendEslintExtend('jest-overrides');

  updatePackageInfo(packageInfo => {
    if (packageInfo.eslintConfig.overrides) {
      const jestOverride = {
        files: ['*.?(test|spec).{j,t}s?(x)']
      };

      packageInfo.eslintConfig.overrides = packageInfo.eslintConfig.overrides.filter(
        override => override.files.join() !== jestOverride.files.join()
      );
    }

    return packageInfo;
  });
}

module.exports = addJest;
