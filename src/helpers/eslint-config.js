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
  updatePackageInfo((packageInfo) => {
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

function prependEslintExtend(configName) {
  updatePackageInfo((packageInfo) => {
    if (packageInfo.eslintConfig.extends.includes(configName)) {
      return packageInfo;
    }

    packageInfo.eslintConfig.extends = [
      configName,
      ...packageInfo.eslintConfig.extends,
    ];

    return packageInfo;
  });
}

function appendEslintExtend(configName) {
  updatePackageInfo((packageInfo) => {
    if (packageInfo.eslintConfig.extends.includes(configName)) {
      return packageInfo;
    }

    packageInfo.eslintConfig.extends = [
      ...packageInfo.eslintConfig.extends,
      configName,
    ];

    return packageInfo;
  });
}

function removeEslintExtend(configName) {
  updatePackageInfo((packageInfo) => {
    packageInfo.eslintConfig.extends = packageInfo.eslintConfig.extends.filter(
      (name) => name !== configName
    );

    return packageInfo;
  });
}

function replaceEslintExtend(configNameSearch, configNameReplace) {
  updatePackageInfo((packageInfo) => {
    packageInfo.eslintConfig.extends = packageInfo.eslintConfig.extends.map(
      (name) => {
        if (name === configNameSearch) {
          return configNameReplace;
        }

        return name;
      }
    );

    return packageInfo;
  });
}

function addEslintIgnore(pattern) {
  updatePackageInfo((packageInfo) => {
    if (packageInfo.eslintIgnore.includes(pattern)) {
      return packageInfo;
    }

    packageInfo.eslintIgnore = [...packageInfo.eslintIgnore, pattern];

    return packageInfo;
  });
}

function removeEslintIgnore(pattern) {
  updatePackageInfo((packageInfo) => {
    packageInfo.eslintIgnore = packageInfo.eslintIgnore.filter(
      (item) => item !== pattern
    );

    return packageInfo;
  });
}

module.exports = {
  createConfigPath,
  prepareEslintConfig,
  prependEslintExtend,
  appendEslintExtend,
  removeEslintExtend,
  replaceEslintExtend,
  addEslintIgnore,
  removeEslintIgnore,
};
