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
    packageInfo.scripts.test !== 'echo "Error: no test specified" && exit 1'
  ) {
    return;
  }

  addJestConfig();

  addTestCommand();
}

function addTestCommand() {
  const ownInfo = getOwnInfo();
  const binName = Object.keys(ownInfo.bin)[0];
  updatePackageInfo(packageInfo => {
    if (!packageInfo.scripts) {
      packageInfo.scripts = {};
    }
    packageInfo.scripts.test = binName + ' test';

    return packageInfo;
  });
}

function addJestConfig() {
  const rcFile = 'jest.config.js';
  const templatePath = path.join(__dirname, 'jest.config.tpl.js');
  addFileFromTemplate(rcFile, templatePath);
}

module.exports = addJest;
