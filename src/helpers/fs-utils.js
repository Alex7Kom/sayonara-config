'use strict';

const fs = require('fs');
const path = require('path');

function createDir(dir) {
  try {
    fs.mkdirSync(path.join(process.cwd(), dir));
  } catch (e) {
    // ignore error
  }
}

function removeFile(file) {
  try {
    fs.unlinkSync(file);
  } catch (e) {
    // ignore error
  }
}

function addFileFromTemplate(filePath, templatePath, variables = {}) {
  try {
    fs.readFileSync(filePath);
  } catch (e) {
    let template = fs.readFileSync(templatePath, 'utf8');

    Object.keys(variables).forEach(variable => {
      template = template.replace(`%${variable}%`, variables[variable]);
    });

    fs.writeFileSync(filePath, template);
  }
}

function updateConfigFile(filePath, templatePath) {
  const delimeter = '\n## DO NOT EDIT ABOVE THIS LINE ##\n';

  const template = fs.readFileSync(templatePath, 'utf8');
  let file;
  let parts;

  try {
    file = fs.readFileSync(filePath, 'utf8');
    parts = file.split(delimeter);
  } catch (e) {
    parts = [''];
  }

  if (parts.length < 2) {
    parts.unshift(template);
  } else {
    parts[0] = template;
  }

  fs.writeFileSync(filePath, parts.join(delimeter));
}

exports.createDir = createDir;
exports.removeFile = removeFile;
exports.addFileFromTemplate = addFileFromTemplate;
exports.updateConfigFile = updateConfigFile;
