'use strict';

const {
  updateJSONConfig,
  writeJSONConfig,
} = require('../../helpers/json-config');

function tsConfig(options = {}, configPath = 'tsconfig.json') {
  try {
    updateJSONConfig(configPath, function (config) {
      return {
        ...config,
        ...options,
        compilerOptions: {
          ...config.compilerOptions,
          ...options.compilerOptions,
        },
      };
    });
  } catch (error) {
    writeJSONConfig(configPath, options);
  }
}

module.exports = tsConfig;
