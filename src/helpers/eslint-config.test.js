'use strict';

const { updatePackageInfo } = require('./package-json');
const { getOwnInfo } = require('./own-info');

const {
  prepareEslintConfig,
  prependEslintExtend,
  appendEslintExtend,
  removeEslintExtend,
  replaceEslintExtend,
  addEslintIgnore,
  removeEslintIgnore
} = require('./eslint-config');

jest.mock('./package-json');
jest.mock('./own-info');

getOwnInfo.mockImplementation(() => ({ name: 'fake' }));

beforeEach(() => jest.clearAllMocks());

describe('eslintConfigUtils', () => {
  describe('prepareEslintConfig', () => {
    it('creates config if there is none', () => {
      updatePackageInfo.mockImplementation(cb => cb({}));

      prepareEslintConfig();

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintConfig: {
          extends: [],
          overrides: []
        },
        eslintIgnore: []
      });
    });

    it('upgrades non-array extends and overrides to arrays', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintConfig: {
            extends: './extend.js',
            overrides: { files: ['*.ts'], rules: {} }
          }
        })
      );

      prepareEslintConfig();

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintConfig: {
          extends: ['./extend.js'],
          overrides: [{ files: ['*.ts'], rules: {} }]
        },
        eslintIgnore: []
      });
    });
  });

  describe('prependEslintExtend', () => {
    it('prepends the extend by env name if it does not exist', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintConfig: {
            extends: ['./extend.js']
          }
        })
      );

      prependEslintExtend('test');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintConfig: {
          extends: [
            './node_modules/fake/src/configs/eslint-test.js',
            './extend.js'
          ]
        }
      });
    });

    it('does nothing if the extend does exist', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintConfig: {
            extends: [
              './node_modules/fake/src/configs/eslint-test.js',
              './extend.js'
            ]
          }
        })
      );

      prependEslintExtend('test');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintConfig: {
          extends: [
            './node_modules/fake/src/configs/eslint-test.js',
            './extend.js'
          ]
        }
      });
    });
  });

  describe('appendEslintExtend', () => {
    it('appends the extend by env name if it does not exist', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintConfig: {
            extends: ['./extend.js']
          }
        })
      );

      appendEslintExtend('test');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintConfig: {
          extends: [
            './extend.js',
            './node_modules/fake/src/configs/eslint-test.js'
          ]
        }
      });
    });

    it('does nothing if the extend does exist', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintConfig: {
            extends: [
              './extend.js',
              './node_modules/fake/src/configs/eslint-test.js'
            ]
          }
        })
      );

      appendEslintExtend('test');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintConfig: {
          extends: [
            './extend.js',
            './node_modules/fake/src/configs/eslint-test.js'
          ]
        }
      });
    });
  });

  describe('removeEslintExtend', () => {
    it('removes the extend by env name', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintConfig: {
            extends: [
              './extend.js',
              './node_modules/fake/src/configs/eslint-test.js'
            ]
          }
        })
      );

      removeEslintExtend('test');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintConfig: {
          extends: ['./extend.js']
        }
      });
    });
  });

  describe('replaceEslintExtend', () => {
    it('replaces the extend by env names', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintConfig: {
            extends: [
              './extend.js',
              './node_modules/fake/src/configs/eslint-test.js',
              './extend2.js'
            ]
          }
        })
      );

      replaceEslintExtend('test', 'check');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintConfig: {
          extends: [
            './extend.js',
            './node_modules/fake/src/configs/eslint-check.js',
            './extend2.js'
          ]
        }
      });
    });
  });

  describe('addEslintIgnore', () => {
    it('adds pattern to eslintIgnore if it does not exist', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintIgnore: []
        })
      );

      addEslintIgnore('foo');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintIgnore: ['foo']
      });
    });

    it('does nothing if the pattern does exist', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintIgnore: ['foo']
        })
      );

      addEslintIgnore('foo');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintIgnore: ['foo']
      });
    });
  });

  describe('removeEslintIgnore', () => {
    it('removes pattern from eslintIgnore', () => {
      updatePackageInfo.mockImplementation(cb =>
        cb({
          eslintIgnore: ['foo']
        })
      );

      removeEslintIgnore('foo');

      expect(updatePackageInfo.mock.results[0].value).toEqual({
        eslintIgnore: []
      });
    });
  });
});
