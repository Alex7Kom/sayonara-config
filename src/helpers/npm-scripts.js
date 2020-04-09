'use strict';

const { updatePackageInfo } = require('./package-json');

function addNpmScript(name, command) {
  updatePackageInfo((packageInfo) => {
    packageInfo.scripts[name] = command;

    return packageInfo;
  });
}

function removeNpmScript(name) {
  updatePackageInfo((packageInfo) => {
    delete packageInfo.scripts[name];

    return packageInfo;
  });
}

module.exports = {
  addNpmScript,
  removeNpmScript,
};
