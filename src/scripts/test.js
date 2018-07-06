'use strict';

const path = require('path');

const jest = require('jest-cli');

const jestConfig = require(path.join(process.cwd(), 'jest.config.js'));

jest.runCLI(jestConfig, [jestConfig.rootDir ? jestConfig.rootDir : '.']);
