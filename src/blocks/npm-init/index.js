'use strict';

const { runNpm } = require('../../helpers/run-npm');
const {
  getPackageInfo,
  writePackageInfo
} = require('../../helpers/package-json');

function npmInit() {
  try {
    getPackageInfo();
  } catch (error) {
    writePackageInfo(require('./package.tpl.json'));
    runNpm('init');
  }
}

module.exports = npmInit;
