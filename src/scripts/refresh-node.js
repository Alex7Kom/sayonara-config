'use strict';

const fs = require('fs');
const path = require('path');

const delimeter = '\n## DO NOT EDIT ABOVE THIS LINE ##\n';

function refresh() {
  updateConfigFile('gitignore');

  updateConfigFile('editorconfig');
}

function updateConfigFile(name) {
  const filePath = '.' + name;
  const templatePath = path.join(__dirname, '../templates', name);

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

refresh();
