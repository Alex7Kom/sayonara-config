'use strict';

const path = require('path');

const { addFileFromTemplate } = require('../../helpers/fs-utils');
const {
  getPackageInfo,
  updatePackageInfo
} = require('../../helpers/package-json');
const { getOwnInfo } = require('../../helpers/own-info');
const { runNpm } = require('../../helpers/run-npm');

function addEslintConfig(env) {
  const ownInfo = getOwnInfo();

  updatePackageInfo(packageInfo => {
    if (packageInfo.name === ownInfo.name) {
      return;
    }

    if (!packageInfo.eslintConfig) {
      packageInfo.eslintConfig = {};
    }

    const eslintConfigPath = path.join(
      'node_modules',
      ownInfo.name,
      `src/configs/eslint-${env}.js`
    );

    packageInfo.eslintConfig.extends = './' + eslintConfigPath;

    return packageInfo;
  });
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
  const ownInfo = getOwnInfo();

  const binName = Object.keys(ownInfo.bin)[0];

  const npmScriptCommands = {
    lint: 'eslint src/**/*.js',
    pretty: 'pretty-quick',
    'pre-commit': 'pretty-quick --staged && npm run lint'
  };

  updatePackageInfo(packageInfo => {
    if (!packageInfo.scripts) {
      packageInfo.scripts = {};
    }

    if (packageInfo.scripts.lint === binName + ' lint-node') {
      delete packageInfo.scripts.lint;
    }

    if (packageInfo.scripts.pretty === binName + ' pretty') {
      delete packageInfo.scripts.pretty;
    }

    // upgrade to husky 1.x
    if (packageInfo.scripts.precommit) {
      delete packageInfo.scripts.precommit;
    }

    packageInfo.scripts = Object.assign(
      {},
      npmScriptCommands,
      packageInfo.scripts
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
