'use strict';

const {
  getPackageInfo,
  updatePackageInfo
} = require('../helpers/package-json');

// get params
let sets = process.argv.slice(process.argv[2] === 'config' ? 3 : 2);

// if empty try to read package.json
if (sets.length === 0) {
  try {
    const packageInfo = getPackageInfo();
    if (packageInfo.sayonaraConfig && packageInfo.sayonaraConfig.sets) {
      sets = packageInfo.sayonaraConfig.sets;
    }
  } catch (error) {
    // skip this step
  }
}

// add essentials
let setsToExecute = ['essentials', ...sets];

// dedup
setsToExecute = Array.from(new Set(setsToExecute));

console.log('Applying sets: ' + setsToExecute.join(', '));

// execute
setsToExecute.forEach(set => {
  require('../sets/' + set).forEach(block => {
    if (typeof block === 'string') {
      require('../blocks/' + block)();
    } else {
      require('../blocks/' + block[0])(block[1]);
    }
  });
});

// save sets
updatePackageInfo(packageInfo => {
  if (!packageInfo.sayonaraConfig) {
    packageInfo.sayonaraConfig = {};
  }

  packageInfo.sayonaraConfig.sets = sets;

  return packageInfo;
});

console.log('Configuration successfully applied!');
