'use strict';

const path = require('path');

const { addFileFromTemplate } = require('../../helpers/fs-utils');
const {
  getPackageInfo,
  updatePackageInfo
} = require('../../helpers/package-json');
const { getOwnInfo } = require('../../helpers/own-info');
const { runNpm } = require('../../helpers/run-npm');
const {
  prepareEslintConfig,
  prependEslintExtend,
  removeEslintExtend
} = require('../../helpers/eslint-config');
const { addNpmScript } = require('../../helpers/npm-scripts');

const eslintEnvs = ['base', 'browser', 'node', 'node-ts', 'universal'];

function addEslintConfig(envName) {
  if (!eslintEnvs.includes(envName)) {
    throw new Error('No such eslint config env: ' + envName);
  }

  prepareEslintConfig();
  removeEslintExtend('base');
  prependEslintExtend(envName);
}

function addPrettierConfig() {
  const ownInfo = getOwnInfo();

  const rcFile = '.prettierrc.js';
  const templatePath = path.join(__dirname, 'prettierrc.tpl.js');

  const prettierConfigPath = path.join(ownInfo.name, 'src/configs/prettier.js');

  addFileFromTemplate(rcFile, templatePath, {
    path: prettierConfigPath
  });
}

function addScripts() {
  addNpmScript('lint', 'eslint "src/**/*.{j,t}s?(x)"');
  addNpmScript('test:lint', 'npm run lint');
  addNpmScript('pretty', 'pretty-quick');

  const huskyHooks = {
    'pre-commit': 'pretty-quick --staged && npm run lint'
  };

  updatePackageInfo(packageInfo => {
    // upgrade to husky 1.x
    delete packageInfo.scripts.precommit;

    if (!packageInfo.husky) {
      packageInfo.husky = {
        hooks: {}
      };
    }

    packageInfo.husky.hooks = Object.assign(
      {},
      huskyHooks,
      packageInfo.husky.hooks
    );

    return packageInfo;
  });
}

function installHusky() {
  const packageInfo = getPackageInfo();

  if (packageInfo.devDependencies && packageInfo.devDependencies.husky) {
    return;
  }

  runNpm('install', '--save-dev', 'husky');
}

function addEslintPrettier(opts) {
  installHusky();

  addEslintConfig(opts.env);

  addPrettierConfig();

  addScripts();
}

module.exports = addEslintPrettier;
