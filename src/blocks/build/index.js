'use strict';

const { addNpmScript } = require('../../helpers/npm-scripts');

module.exports = function () {
  // added so run-s won't throw if no build tasks found
  addNpmScript('build:void', ':');

  addNpmScript('build', 'run-s build:*');
};
