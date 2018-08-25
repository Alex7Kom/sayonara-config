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
    (packageInfo.scripts.test !== 'echo "Error: no test specified" && exit 1' &&
      packageInfo.scripts.test !== 'sayonara-config test' &&
      packageInfo.scripts.test !== 'jest')
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
      jest: true,
      node: true,
      es6: true
    },
    parserOptions: {
      ecmaVersion: 6
    }
  };

  updatePackageInfo(packageInfo => {
    if (!packageInfo.eslintConfig) {
      packageInfo.eslintConfig = {};
    }

    if (packageInfo.eslintConfig.overrides) {
      let hasOverride = false;

      packageInfo.eslintConfig.overrides = packageInfo.eslintConfig.overrides.map(
        override => {
          if (override.files.join() === jestOverride.files.join()) {
            hasOverride = true;

            return jestOverride;
          }

          return override;
        }
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
