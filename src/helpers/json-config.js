'use strict';

const fs = require('fs');

function getJSONConfig(configPath) {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function updateJSONConfig(configPath, updater) {
  const updated = updater(getJSONConfig(configPath));

  if (updated) {
    writeJSONConfig(configPath, updated);
  }
}

function writeJSONConfig(configPath, configData) {
  fs.writeFileSync(configPath, JSON.stringify(configData, null, 2) + '\n');
}

module.exports = {
  getJSONConfig,
  updateJSONConfig,
  writeJSONConfig
};
