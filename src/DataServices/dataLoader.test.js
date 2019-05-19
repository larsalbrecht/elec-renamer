const path = require('path');
const dataLoader = require('./dataLoader');

const TEST_DATA_DIR_NAME = '__testdata__';
const TEST_DATA_SUB_DIR_NAME_01 = 'a.dir.example';
const TEST_DATA_SUB_DIR_NAME_02 = 'b.dir.example';
const TEST_DATA_DIR = path.join(__dirname, TEST_DATA_DIR_NAME);
const TEST_DATA_SUB_DIR_01 = path.join(__dirname, TEST_DATA_DIR_NAME, TEST_DATA_SUB_DIR_NAME_01);
const TEST_DATA_SUB_DIR_02 = path.join(__dirname, TEST_DATA_DIR_NAME, TEST_DATA_SUB_DIR_NAME_02);

describe('dataLoader', () => {
  describe('listFilePaths', () => {
    it('list file paths in test directory', async () => {
      const actual = await dataLoader.listFilePaths(TEST_DATA_DIR);

      expect(actual)
        .toEqual([
          path.join(TEST_DATA_DIR, 'a.example'),
          path.join(TEST_DATA_DIR, 'b.example'),
          path.join(TEST_DATA_DIR, 'c.example'),
        ]);
    });
  });

  describe('listFilePathsRecursive', () => {
    it('list file paths asynchronous and recursive in test directory', async () => {
      const simpleSort = (a, b) => a.toLowerCase()
        .localeCompare(b.toLowerCase());

      const actual = await dataLoader.listFilePathsRecursive(TEST_DATA_DIR);

      expect(actual.sort(simpleSort))
        .toEqual([
          path.join(TEST_DATA_DIR, 'a.example'),
          path.join(TEST_DATA_DIR, 'b.example'),
          path.join(TEST_DATA_DIR, 'c.example'),
          path.join(TEST_DATA_SUB_DIR_01, 'a.a.example'),
          path.join(TEST_DATA_SUB_DIR_01, 'a.b.example'),
          path.join(TEST_DATA_SUB_DIR_02, 'b.a.example'),
          path.join(TEST_DATA_SUB_DIR_02, 'b.b.example'),
        ].sort(simpleSort));
    });
  });

  describe('listFilePathsRecursiveSync', () => {
    it('list file paths recursive in test directory', async () => {
      const simpleSort = (a, b) => a.toLowerCase()
        .localeCompare(b.toLowerCase());

      const actual = dataLoader.listFilePathsRecursiveSync(TEST_DATA_DIR);

      expect(actual.sort(simpleSort))
        .toEqual([
          path.join(TEST_DATA_DIR, 'a.example'),
          path.join(TEST_DATA_DIR, 'b.example'),
          path.join(TEST_DATA_DIR, 'c.example'),
          path.join(TEST_DATA_SUB_DIR_01, 'a.a.example'),
          path.join(TEST_DATA_SUB_DIR_01, 'a.b.example'),
          path.join(TEST_DATA_SUB_DIR_02, 'b.a.example'),
          path.join(TEST_DATA_SUB_DIR_02, 'b.b.example'),
        ].sort(simpleSort));
    });
  });
});
