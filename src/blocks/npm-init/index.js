'use strict';

const { runNpm } = require('../../helpers/run-npm');
const {
  getPackageInfo,
  writePackageInfo
} = require('../../helpers/package-json');

function npmInit() {
  try {
    getPackageInfo();
  } catch (e) {
    writePackageInfo(require('./package.tpl.json'));
    runNpm('init');
  }
}

exports.npmInit = npmInit;
