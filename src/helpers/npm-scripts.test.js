'use strict';

const { updatePackageInfo } = require('./package-json');

const { addNpmScript, removeNpmScript } = require('./npm-scripts');

jest.mock('./package-json');

beforeEach(() => jest.clearAllMocks());

describe('addNpmScript', () => {
  it('adds script with specified name and command', () => {
    updatePackageInfo.mockImplementation((cb) => cb({ scripts: {} }));

    addNpmScript('test', 'jest');

    expect(updatePackageInfo.mock.results[0].value).toEqual({
      scripts: {
        test: 'jest',
      },
    });
  });

  it('expects that scripts object does not exist', () => {
    updatePackageInfo.mockImplementation((cb) => cb({}));

    addNpmScript('test', 'jest');

    expect(updatePackageInfo.mock.results[0].value).toEqual({
      scripts: {
        test: 'jest',
      },
    });
  });
});

describe('removeNpmScript', () => {
  it('removes script with specified name', () => {
    updatePackageInfo.mockImplementation((cb) =>
      cb({ scripts: { test: 'jest' } })
    );

    removeNpmScript('test');

    expect(updatePackageInfo.mock.results[0].value).toEqual({
      scripts: {},
    });
  });

  it('expects that scripts object does not exist', () => {
    updatePackageInfo.mockImplementation((cb) => cb({}));

    removeNpmScript('test');

    expect(updatePackageInfo.mock.results[0].value).toEqual({
      scripts: {},
    });
  });
});
