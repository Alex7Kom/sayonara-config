'use strict';

const { runNpm } = require('../../helpers/run-npm');
const { getPackageInfo } = require('../../helpers/package-json');
const { getOwnInfo } = require('../../helpers/own-info');

function installMe() {
  const packageInfo = getPackageInfo();
  const ownInfo = getOwnInfo();

  if (
    packageInfo.devDependencies &&
    packageInfo.devDependencies[ownInfo.name]
  ) {
    return;
  }

  runNpm('install', '--save-dev', '--save-exact', ownInfo.name);
}

exports.installMe = installMe;
