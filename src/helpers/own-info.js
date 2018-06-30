'use strict';

const path = require('path');

function getOwnInfo() {
  return require(path.join(__dirname, '../..', 'package.json'));
}

exports.getOwnInfo = getOwnInfo;
