'use strict';

const path = require('path');

const { updateConfigFile } = require('../../helpers/fs-utils');

function updateNpmIgnore() {
  updateConfigFile('.npmignore', path.join(__dirname, 'tpl.npmignore'));
}

exports.updateNpmIgnore = updateNpmIgnore;
