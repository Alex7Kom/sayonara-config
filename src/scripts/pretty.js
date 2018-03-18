'use strict';

const fs = require('fs');
const path = require('path');

const glob = require('glob');
const prettier = require('prettier');

const prettierConfig = require('../configs/prettier');

const files = glob.sync(path.join(process.cwd(), 'src/**/*.js'), {});

files.forEach(filePath => {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  if (!prettier.check(fileContent, prettierConfig)) {
    console.log(`${filePath} is pretty now!`);

    const fixedContent = prettier.format(fileContent, prettierConfig);

    fs.writeFileSync(filePath, fixedContent);
  }
});
