'use strict';

const fs = require('fs');
const childProcess = require('child_process');

const glob = require('glob');
const prettier = require('prettier');

const prettierConfig = require('../configs/prettier');

const isStaged = process.argv[3] === '--staged';

const files = glob.sync('src/**/*.js', {});
let stagedFiles;

if (isStaged) {
  stagedFiles = childProcess.execSync('git diff --name-only --cached', {
    encoding: 'utf8'
  });
  stagedFiles = stagedFiles.split('\n');
}

files.forEach(filePath => {
  if (isStaged && stagedFiles.indexOf(filePath) === -1) {
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');

  if (prettier.check(fileContent, prettierConfig)) {
    return console.log(`${filePath} is already pretty!`);
  }

  console.log(`${filePath} is pretty now!`);

  const fixedContent = prettier.format(fileContent, prettierConfig);

  fs.writeFileSync(filePath, fixedContent);

  if (isStaged) {
    childProcess.execSync('git add ' + filePath);
  }
});
