'use strict';

const path = require('path');

const { addFileFromTemplate } = require('../../helpers/fs-utils');

function addNPMConfig() {
  const useNPMLock = process.argv[3] === '--use-npm-lock';

  if (useNPMLock) {
    return;
  }

  const rcFile = '.npmrc';
  const templatePath = path.join(__dirname, 'tpl.npmrc');

  addFileFromTemplate(rcFile, templatePath);
}

exports.addNPMConfig = addNPMConfig;
