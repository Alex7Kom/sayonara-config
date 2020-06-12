'use strict';

const { addNpmScript } = require('../../helpers/npm-scripts');

module.exports = function () {
  addNpmScript('tsc', 'tsc -p tsconfig.json --noEmit');
};
