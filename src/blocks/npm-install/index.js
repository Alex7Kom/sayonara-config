'use strict';

const { runNpm } = require('../../helpers/run-npm');
const { getPackageInfo } = require('../../helpers/package-json');

function npmInstall(options = {}) {
  const name = options.name;
  const version = options.version || 'latest';
  const isDev = Boolean(options.isDev);
  const isExact = Boolean(options.isExact);

  const packageInfo = getPackageInfo();

  if (
    (packageInfo.dependencies && packageInfo.dependencies[name]) ||
    (packageInfo.devDependencies && packageInfo.devDependencies[name])
  ) {
    return;
  }

  const args = ['install'];

  if (isDev) {
    args.push('--save-dev');
  }

  if (isExact) {
    args.push('--save-exact');
  }

  args.push(`${name}@${version}`);

  runNpm(...args);
}

module.exports = npmInstall;
