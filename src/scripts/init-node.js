'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const ownInfo = require(path.join(__dirname, '../..', 'package.json'));
const packageInfoPath = path.join(process.cwd(), 'package.json');

const binName = Object.keys(ownInfo.bin)[0];

const npmScriptCommands = {
  lint: binName + ' lint-node',
  pretty: binName + ' pretty',
  precommit: binName + ' pretty --staged'
};

function init() {
  let packageInfo;

  try {
    packageInfo = readPackageInfo();
  } catch (e) {
    packageInfo = require('../templates/package.json');
    writePackageInfo(packageInfo);
    npmInit();

    return init();
  }

  checkIfMe(packageInfo);

  createDir('src');

  installMe(packageInfo);

  gitInit();

  installHusky(packageInfo);

  addEslintConfig(packageInfo);

  addScripts(packageInfo);

  addLicenseFile(packageInfo);

  addReadmeFile(packageInfo);

  console.log('The project successfully initialized!');
}

function checkIfMe(packageInfo) {
  if (packageInfo.name === ownInfo.name) {
    console.error('The init script cannot be run within its own repo.');
    process.exit(1);
  }
}

function addEslintConfig(packageInfo) {
  if (packageInfo.eslintConfig) {
    return;
  }

  const eslintConfigPath = path.join(
    'node_modules',
    ownInfo.name,
    'src/configs/eslint-node.js'
  );
  packageInfo.eslintConfig = {
    extends: './' + eslintConfigPath
  };

  writePackageInfo(packageInfo);
}

function addScripts(packageInfo) {
  if (!packageInfo.scripts) {
    packageInfo.scripts = {};
  }

  Object.keys(npmScriptCommands).forEach(key => {
    if (!packageInfo.scripts[key]) {
      packageInfo.scripts[key] = npmScriptCommands[key];
    }
  });

  writePackageInfo(packageInfo);
}

function installMe(packageInfo) {
  if (
    packageInfo.devDependencies &&
    packageInfo.devDependencies[ownInfo.name]
  ) {
    return;
  }

  runNpm('install', '--save-dev', '--save-exact', ownInfo.name);
}

function installHusky(packageInfo) {
  if (packageInfo.devDependencies && packageInfo.devDependencies.husky) {
    return;
  }

  runNpm('install', '--save-dev', 'husky');
}

function npmInit() {
  runNpm('init');
}

function runNpm(...args) {
  runCommand('npm', args);
}

function runCommand(command, args) {
  childProcess.spawnSync(command, args, { stdio: 'inherit' });
}

function createDir(dir) {
  try {
    fs.mkdirSync(path.join(process.cwd(), dir));
  } catch (e) {
    // ignore error
  }
}

function addReadmeFile(packageInfo) {
  const readmePath = path.join(process.cwd(), 'README.md');
  const templatePath = path.join(__dirname, '../templates', 'README.md');

  try {
    fs.readFileSync(readmePath);
  } catch (e) {
    let template = fs.readFileSync(templatePath, 'utf8');
    template = template.replace(/%(\w+)%/g, (m, p1) => packageInfo[p1]);

    fs.writeFileSync(readmePath, template);
  }
}

function addLicenseFile(packageInfo) {
  if (packageInfo.license !== 'MIT') {
    return;
  }

  const licensePath = path.join(process.cwd(), 'LICENSE');
  const templatePath = path.join(__dirname, '../templates', 'LICENSE');

  try {
    fs.readFileSync(licensePath);
  } catch (e) {
    let template = fs.readFileSync(templatePath, 'utf8');
    template = template
      .replace('%year%', new Date().getFullYear())
      .replace('%author%', packageInfo.author);

    fs.writeFileSync(licensePath, template);
  }
}

function gitInit() {
  runCommand('git', ['init']);
}

function readPackageInfo() {
  return JSON.parse(fs.readFileSync(packageInfoPath, 'utf8'));
}

function writePackageInfo(data) {
  return fs.writeFileSync(packageInfoPath, JSON.stringify(data, null, 2));
}

init();

require('./refresh-node');
