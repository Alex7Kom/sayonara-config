'use strict';

const JSONConfig = require('./json-config');

const packageInfoPath = 'package.json';

module.exports = {
  getPackageInfo: JSONConfig.getJSONConfig.bind(null, packageInfoPath),
  updatePackageInfo: JSONConfig.updateJSONConfig.bind(null, packageInfoPath),
  writePackageInfo: JSONConfig.writeJSONConfig.bind(null, packageInfoPath),
};
