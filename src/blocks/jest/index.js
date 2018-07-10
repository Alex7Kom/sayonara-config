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
    packageInfo.scripts.test !== 'echo "Error: no test specified" && exit 1'
  ) {
    return;
  }

  addJestConfig();

  addTestCommand();
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

module.exports = addJest;
