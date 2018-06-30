'use strict';

const { createDir } = require('../helpers/fs-utils');
const { getOwnInfo } = require('../helpers/own-info');
const { getPackageInfo } = require('../helpers/package-json');

const { gitInit } = require('../blocks/git-init');
const { installMe } = require('../blocks/install-me');
const { addReadmeFile } = require('../blocks/readme');
const { addLicenseFile } = require('../blocks/license');
const { addNPMConfig } = require('../blocks/npm-config');
const { addEslintPrettier } = require('../blocks/eslint-prettier');
const { npmInit } = require('../blocks/npm-init');

function init() {
  npmInit();

  checkIfMe();

  addNPMConfig();

  createDir('src');

  installMe();

  gitInit();

  addEslintPrettier();

  addLicenseFile();

  addReadmeFile();

  require('./refresh-node');

  console.log('The project successfully initialized!');
}

function checkIfMe() {
  const packageInfo = getPackageInfo();
  const ownInfo = getOwnInfo();

  if (packageInfo.name === ownInfo.name) {
    console.error('The init script cannot be run within its own repo.');
    process.exit(1);
  }
}

init();
