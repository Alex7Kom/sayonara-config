'use strict';

const fs = require('fs');
const path = require('path');

const delimeter = '\n## DO NOT EDIT ABOVE THIS LINE ##\n';

function refresh() {
  updateGitIgnore();

  writeEditorConfig();
}

function updateGitIgnore() {
  const filePath = '.gitignore';
  const templatePath = path.join(__dirname, '../templates', 'gitignore');

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

function writeEditorConfig() {
  const filePath = '.editorconfig';
  const templatePath = path.join(__dirname, '../templates', 'editorconfig');

  const template = fs.readFileSync(templatePath, 'utf8');
  fs.writeFileSync(filePath, template);
}

refresh();
