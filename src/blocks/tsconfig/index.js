'use strict';

const {
  updateJSONConfig,
  writeJSONConfig
} = require('../../helpers/json-config');

const configPath = 'tsconfig.json';

function tsConfig(options = {}) {
  try {
    updateJSONConfig(configPath, function(config) {
      return {
        ...config,
        ...options,
        compilerOptions: {
          ...config.compilerOptions,
          ...options.compilerOptions
        }
      };
    });
  } catch (error) {
    writeJSONConfig(configPath, options);
  }
}

module.exports = tsConfig;
