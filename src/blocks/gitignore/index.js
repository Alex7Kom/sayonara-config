'use strict';

const path = require('path');

const { updateConfigFile } = require('../../helpers/fs-utils');

function updateGitIgnore() {
  updateConfigFile('.gitignore', path.join(__dirname, 'tpl.gitignore'));
}

module.exports = updateGitIgnore;
