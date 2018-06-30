'use strict';

const { runCommand } = require('./run-command');

function runNpm(...args) {
  runCommand('npm', args);
}

exports.runNpm = runNpm;
