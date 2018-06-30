'use strict';

const path = require('path');

const { getPackageInfo } = require('../../helpers/package-json');
const { addFileFromTemplate } = require('../../helpers/fs-utils');

function addLicenseFile() {
  const packageInfo = getPackageInfo();

  if (packageInfo.license !== 'MIT') {
    return;
  }

  const licensePath = path.join(process.cwd(), 'LICENSE');
  const templatePath = path.join(__dirname, 'LICENSE.tpl');

  addFileFromTemplate(licensePath, templatePath, {
    year: new Date().getFullYear(),
    author: packageInfo.author
  });
}

exports.addLicenseFile = addLicenseFile;
