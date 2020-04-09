'use strict';

const fs = require('fs');

const { addFileFromTemplate, updateConfigFile } = require('./fs-utils');

jest.mock('fs');

beforeEach(() => jest.clearAllMocks());

describe('fsUtils', () => {
  describe('addFileFromTemplate', () => {
    it('skips file if it already exists', () => {
      fs.readFileSync.mockImplementation(() => 'exists');
      fs.writeFileSync.mockImplementation(() => null);

      addFileFromTemplate('foo', 'template');

      expect(fs.writeFileSync.mock.calls).toHaveLength(0);
    });

    it('writes file if it does not exist', () => {
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath === 'foo') throw new Error('does not exist');
        if (filePath === 'template') return 'contents';
      });
      fs.writeFileSync.mockImplementation(() => null);

      addFileFromTemplate('foo', 'template');

      expect(fs.writeFileSync.mock.calls[0]).toEqual(['foo', 'contents']);
    });
  });

  describe('updateConfigFile', () => {
    it('adds file by template if it does not exist', () => {
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath === 'foo') throw new Error('does not exist');
        if (filePath === 'template') return 'foo=bar';
      });
      fs.writeFileSync.mockImplementation(() => null);

      updateConfigFile('foo', 'template');

      expect(fs.writeFileSync.mock.calls[0]).toEqual([
        'foo',
        'foo=bar\n## DO NOT EDIT ABOVE THIS LINE ##\n',
      ]);
    });

    it('upgrades file to template if it does exist', () => {
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath === 'foo') return 'config=exists';
        if (filePath === 'template') return 'foo=bar';
      });
      fs.writeFileSync.mockImplementation(() => null);

      updateConfigFile('foo', 'template');

      expect(fs.writeFileSync.mock.calls[0]).toEqual([
        'foo',
        'foo=bar\n## DO NOT EDIT ABOVE THIS LINE ##\nconfig=exists',
      ]);
    });

    it('updates file by template', () => {
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath === 'foo') {
          return 'old=config\n## DO NOT EDIT ABOVE THIS LINE ##\nconfig=exists';
        }

        if (filePath === 'template') return 'foo=bar';
      });
      fs.writeFileSync.mockImplementation(() => null);

      updateConfigFile('foo', 'template');

      expect(fs.writeFileSync.mock.calls[0]).toEqual([
        'foo',
        'foo=bar\n## DO NOT EDIT ABOVE THIS LINE ##\nconfig=exists',
      ]);
    });
  });
});
