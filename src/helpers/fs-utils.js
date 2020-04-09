'use strict';

const fs = require('fs');

function createDir(dir) {
  try {
    fs.mkdirSync(dir);
  } catch (error) {
    // ignore error
  }
}

function removeFile(file) {
  try {
    fs.unlinkSync(file);
  } catch (error) {
    // ignore error
  }
}

function addFileFromTemplate(filePath, templatePath, variables = {}) {
  try {
    fs.readFileSync(filePath);
  } catch (error) {
    let template = fs.readFileSync(templatePath, 'utf8');

    Object.keys(variables).forEach((variable) => {
      template = template.replace(
        new RegExp(`%${variable}%`, 'g'),
        variables[variable]
      );
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
  } catch (error) {
    parts = [''];
  }

  if (parts.length < 2) {
    parts.unshift(template);
  } else {
    parts[0] = template;
  }

  fs.writeFileSync(filePath, parts.join(delimeter));
}

module.exports = {
  createDir,
  removeFile,
  addFileFromTemplate,
  updateConfigFile,
};
