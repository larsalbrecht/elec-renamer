const dataFilter = require('./dataFilter');

describe('dataFilter', () => {
  describe('fileExtensionFilter', () => {
    it('filter filenames in list with one invalid', () => {
      const actual = dataFilter.fileExtensionFilter('.example')
        .filter(['a.example', 'b.example', 'c.example', 'a.invalid']);

      expect(actual)
        .toEqual(['a.example', 'b.example', 'c.example']);
    });

  });

});
