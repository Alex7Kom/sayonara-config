'use strict';

const fs = require('fs');

const packageInfoPath = 'package.json';

function getPackageInfo() {
  return JSON.parse(fs.readFileSync(packageInfoPath, 'utf8'));
}

function updatePackageInfo(updater) {
  const updated = updater(getPackageInfo());

  if (updated) {
    writePackageInfo(updated);
  }
}

function writePackageInfo(data) {
  fs.writeFileSync(packageInfoPath, JSON.stringify(data, null, 2) + '\n');
}

module.exports = {
  getPackageInfo,
  updatePackageInfo,
  writePackageInfo
};
