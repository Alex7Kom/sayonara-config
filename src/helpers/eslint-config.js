'use strict';

const path = require('path');

const { updatePackageInfo } = require('./package-json');
const { getOwnInfo } = require('./own-info');

function createConfigPath(envName) {
  const ownInfo = getOwnInfo();

  return (
    './' +
    path.join('node_modules', ownInfo.name, `src/configs/eslint-${envName}.js`)
  );
}

function prepareEslintConfig() {
  updatePackageInfo(packageInfo => {
    if (!packageInfo.eslintConfig) {
      packageInfo.eslintConfig = {};
    }

    if (!packageInfo.eslintIgnore) {
      packageInfo.eslintIgnore = [];
    }

    if (!packageInfo.eslintConfig.extends) {
      packageInfo.eslintConfig.extends = [];
    }

    if (!packageInfo.eslintConfig.overrides) {
      packageInfo.eslintConfig.overrides = [];
    }

    if (!Array.isArray(packageInfo.eslintConfig.extends)) {
      packageInfo.eslintConfig.extends = [packageInfo.eslintConfig.extends];
    }

    if (!Array.isArray(packageInfo.eslintConfig.overrides)) {
      packageInfo.eslintConfig.overrides = [packageInfo.eslintConfig.overrides];
    }

    return packageInfo;
  });
}

function prependEslintExtend(envName) {
  updatePackageInfo(packageInfo => {
    if (packageInfo.eslintConfig.extends.includes(createConfigPath(envName))) {
      return packageInfo;
    }

    packageInfo.eslintConfig.extends = [
      createConfigPath(envName),
      ...packageInfo.eslintConfig.extends
    ];

    return packageInfo;
  });
}

function appendEslintExtend(envName) {
  updatePackageInfo(packageInfo => {
    if (packageInfo.eslintConfig.extends.includes(createConfigPath(envName))) {
      return packageInfo;
    }

    packageInfo.eslintConfig.extends = [
      ...packageInfo.eslintConfig.extends,
      createConfigPath(envName)
    ];

    return packageInfo;
  });
}

function removeEslintExtend(envName) {
  updatePackageInfo(packageInfo => {
    packageInfo.eslintConfig.extends = packageInfo.eslintConfig.extends.filter(
      name => name !== createConfigPath(envName)
    );

    return packageInfo;
  });
}

function replaceEslintExtend(envNameSearch, envNameReplace) {
  updatePackageInfo(packageInfo => {
    packageInfo.eslintConfig.extends = packageInfo.eslintConfig.extends.map(
      name => {
        if (name === createConfigPath(envNameSearch)) {
          return createConfigPath(envNameReplace);
        }

        return name;
      }
    );

    return packageInfo;
  });
}

function addEslintIgnore(pattern) {
  updatePackageInfo(packageInfo => {
    if (packageInfo.eslintIgnore.includes(pattern)) {
      return packageInfo;
    }

    packageInfo.eslintIgnore = [...packageInfo.eslintIgnore, pattern];

    return packageInfo;
  });
}

function removeEslintIgnore(pattern) {
  updatePackageInfo(packageInfo => {
    packageInfo.eslintIgnore = packageInfo.eslintIgnore.filter(
      item => item !== pattern
    );

    return packageInfo;
  });
}

module.exports = {
  prepareEslintConfig,
  prependEslintExtend,
  appendEslintExtend,
  removeEslintExtend,
  replaceEslintExtend,
  addEslintIgnore,
  removeEslintIgnore
};
