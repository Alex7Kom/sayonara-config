'use strict';

const path = require('path');

const { addFileFromTemplate } = require('../../helpers/fs-utils');
const {
  getPackageInfo,
  updatePackageInfo
} = require('../../helpers/package-json');

function addJest() {
  const packageInfo = getPackageInfo();

  if (
    packageInfo.scripts &&
    packageInfo.scripts.test &&
    packageInfo.scripts.test !== 'echo "Error: no test specified" && exit 1'
  ) {
    return;
  }

  addJestConfig();

  addTestCommand();

  addEslintOverride();
}

function addTestCommand() {
  updatePackageInfo(packageInfo => {
    if (!packageInfo.scripts) {
      packageInfo.scripts = {};
    }

    packageInfo.scripts.test = 'jest';

    return packageInfo;
  });
}

function addJestConfig() {
  const rcFile = 'jest.config.js';
  const templatePath = path.join(__dirname, 'jest.config.tpl.js');
  addFileFromTemplate(rcFile, templatePath);
}

function addEslintOverride() {
  const jestOverride = {
    files: ['*.test.js', '*.spec.js'],
    env: {
      jest: true
    }
  };

  updatePackageInfo(packageInfo => {
    if (!packageInfo.eslintConfig) {
      packageInfo.eslintConfig = {};
    }

    if (packageInfo.eslintConfig.overrides) {
      const hasOverride = packageInfo.eslintConfig.overrides.some(
        override => override.files.join() === jestOverride.files.join()
      );

      if (!hasOverride) {
        packageInfo.eslintConfig.overrides.push(jestOverride);
      }
    } else {
      packageInfo.eslintConfig.overrides = [jestOverride];
    }

    return packageInfo;
  });
}

module.exports = addJest;
