'use strict';

const {
  prepareEslintConfig,
  prependEslintExtend,
  appendEslintExtend
} = require('../../helpers/eslint-config');

module.extends = function(configName, action = 'append') {
  prepareEslintConfig();

  switch (action) {
    case 'prepend':
      prependEslintExtend(configName);
      break;

    case 'append':
      appendEslintExtend(configName);
      break;

    default:
      throw new Error('eslint-extends: no such action');
  }
};
