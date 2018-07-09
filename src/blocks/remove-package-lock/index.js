'use strict';

const { removeFile } = require('../../helpers/fs-utils');

function removePackageLock() {
  removeFile('package-lock.json');
}

module.exports = removePackageLock;
