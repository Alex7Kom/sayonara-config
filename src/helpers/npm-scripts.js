'use strict';

const { updatePackageInfo } = require('./package-json');

function addNpmScript(name, command) {
  updatePackageInfo((packageInfo) => {
    if (!packageInfo.scripts) {
      packageInfo.scripts = {};
    }

    packageInfo.scripts[name] = command;

    return packageInfo;
  });
}

function removeNpmScript(name) {
  updatePackageInfo((packageInfo) => {
    if (!packageInfo.scripts) {
      packageInfo.scripts = {};

      return packageInfo;
    }

    delete packageInfo.scripts[name];

    return packageInfo;
  });
}

module.exports = {
  addNpmScript,
  removeNpmScript,
};
