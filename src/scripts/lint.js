'use strict';

const path = require('path');

const CLIEngine = require('eslint').CLIEngine;

const { getPackageInfo } = require('../helpers/package-json');

const eslintConfig = require(path.join(
  process.cwd(),
  getPackageInfo().eslintConfig.extends
));

const cli = new CLIEngine(eslintConfig);

const report = cli.executeOnFiles([path.join(process.cwd(), 'src/**/*.js')]);

const formatter = cli.getFormatter();

console.log(formatter(report.results));
