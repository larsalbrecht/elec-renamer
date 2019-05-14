const path = require('path');
const dataLoader = require('./dataLoader');

const TEST_DATA_DIR_NAME = '__testdata__';
const TEST_DATA_DIR = path.join(__dirname, TEST_DATA_DIR_NAME);

describe('dataLoader', () => {
  describe('load', () => {
    it('load files in current directory', async () => {
      const actual = await dataLoader.load(TEST_DATA_DIR);

      expect(actual)
        .toEqual([
          path.join(TEST_DATA_DIR, 'a.example'),
          path.join(TEST_DATA_DIR, 'b.example'),
          path.join(TEST_DATA_DIR, 'c.example'),
        ]);
    });
  });
});
