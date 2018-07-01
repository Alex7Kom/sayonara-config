'use strict';

const { runCommand } = require('../../helpers/run-command');

function gitInit() {
  runCommand('git', ['init']);
}

module.exports = gitInit;
