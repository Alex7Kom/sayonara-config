'use strict';

const { addNpmScript } = require('../../helpers/npm-scripts');

module.exports = function () {
  addNpmScript('prepublishOnly', 'run-s build:*');
};
