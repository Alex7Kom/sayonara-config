'use strict';

const childProcess = require('child_process');

function runCommand(command, args) {
  childProcess.spawnSync(command, args, { stdio: 'inherit' });
}

exports.runCommand = runCommand;
