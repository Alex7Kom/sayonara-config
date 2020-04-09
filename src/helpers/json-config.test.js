'use strict';

const fs = require('fs');

const JSONConfig = require('./json-config');

jest.mock('fs');

beforeEach(() => jest.clearAllMocks());

describe('JSONConfig.updateJSONConfig', () => {
  it('reads config file, calls updater and writes the result', () => {
    fs.readFileSync.mockImplementation(() => '{"a":1}');
    fs.writeFileSync.mockImplementation(() => null);

    JSONConfig.updateJSONConfig('foo', (x) => {
      x.a = 2;

      return x;
    });

    expect(fs.writeFileSync.mock.calls[0][1]).toBe('{\n  "a": 2\n}\n');
  });

  it('does not write anything if updater returned false', () => {
    fs.readFileSync.mockImplementation(() => '{"a":1}');
    fs.writeFileSync.mockImplementation(() => null);

    JSONConfig.updateJSONConfig('foo', () => false);

    expect(fs.writeFileSync.mock.calls).toHaveLength(0);
  });
});
