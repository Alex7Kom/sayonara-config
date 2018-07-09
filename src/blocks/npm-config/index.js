'use strict';

const path = require('path');

const { addFileFromTemplate } = require('../../helpers/fs-utils');

function addNPMConfig() {
  const rcFile = '.npmrc';
  const templatePath = path.join(__dirname, 'tpl.npmrc');

  addFileFromTemplate(rcFile, templatePath);
}

module.exports = addNPMConfig;
