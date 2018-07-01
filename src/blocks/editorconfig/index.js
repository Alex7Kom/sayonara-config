'use strict';

const path = require('path');

const { updateConfigFile } = require('../../helpers/fs-utils');

function updateEditorConfig() {
  updateConfigFile('.editorconfig', path.join(__dirname, 'tpl.editorconfig'));
}

module.exports = updateEditorConfig;
