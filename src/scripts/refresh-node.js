'use strict';

const { updateEditorConfig } = require('../blocks/editorconfig');
const { updateGitIgnore } = require('../blocks/gitignore');
const { updateNpmIgnore } = require('../blocks/npmignore');

updateGitIgnore();

updateEditorConfig();

updateNpmIgnore();
