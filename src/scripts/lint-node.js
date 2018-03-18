'use strict';

const path = require('path');

const CLIEngine = require('eslint').CLIEngine;

const eslintConfig = require('../configs/eslint-node');

const cli = new CLIEngine(eslintConfig);

const report = cli.executeOnFiles([path.join(process.cwd(), 'src/**/*.js')]);

const formatter = cli.getFormatter();

console.log(formatter(report.results));
