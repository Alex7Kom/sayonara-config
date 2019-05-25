'use strict';

const { merge } = require('lodash');

const {
  updateJSONConfig,
  writeJSONConfig
} = require('../../helpers/json-config');

const configPath = 'tsconfig.json';

function tsConfig(options = {}) {
  try {
    updateJSONConfig(configPath, function(config) {
      return merge(config, options);
    });
  } catch (e) {
    writeJSONConfig(configPath, options);
  }
}

module.exports = tsConfig;
