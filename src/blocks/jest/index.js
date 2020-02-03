'use strict';

const path = require('path');

const { addFileFromTemplate } = require('../../helpers/fs-utils');
const {
  getPackageInfo,
  updatePackageInfo
} = require('../../helpers/package-json');
const { getOwnInfo } = require('../../helpers/own-info');

function addJest() {
  const packageInfo = getPackageInfo();

  if (
    packageInfo.scripts &&
    packageInfo.scripts.test &&
    packageInfo.scripts.test !== 'echo "Error: no test specified" && exit 1' &&
    packageInfo.scripts.test !== 'sayonara-config test' &&
    packageInfo.scripts.test !== 'jest'
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
  const ownInfo = getOwnInfo();

  const eslintConfigPath =
    './' +
    path.join('node_modules', ownInfo.name, `src/configs/eslint-jest.js`);

  updatePackageInfo(packageInfo => {
    if (!packageInfo.eslintConfig) {
      packageInfo.eslintConfig = {};
    }

    if (packageInfo.eslintConfig.extends.includes(eslintConfigPath)) {
      return packageInfo;
    }

    if (
      packageInfo.eslintConfig.extends &&
      typeof packageInfo.eslintConfig.extends === 'string'
    ) {
      packageInfo.eslintConfig.extends = [
        packageInfo.eslintConfig.extends,
        eslintConfigPath
      ];
    } else if (Array.isArray(packageInfo.eslintConfig.extends)) {
      packageInfo.eslintConfig.extends = [
        ...packageInfo.eslintConfig.extends,
        eslintConfigPath
      ];
    } else {
      packageInfo.eslintConfig.extends = [eslintConfigPath];
    }

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
