'use strict';

const path = require('path');

const { addFileFromTemplate } = require('../../helpers/fs-utils');
const { getPackageInfo } = require('../../helpers/package-json');

function addReadmeFile() {
  const packageInfo = getPackageInfo();
  const readmePath = 'README.md';
  const templatePath = path.join(__dirname, 'README.tpl.md');

  addFileFromTemplate(readmePath, templatePath, packageInfo);
}

module.exports = addReadmeFile;
