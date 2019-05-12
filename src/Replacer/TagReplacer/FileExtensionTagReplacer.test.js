const FileExtensionTagReplacer = require('./FileExtensionTagReplacer');

describe('FileExtensionTagReplacer', () => {
  it('should return an instance of FileExtensionTagReplacer', () => {
    const actual = new FileExtensionTagReplacer();

    expect(actual)
      .toBeInstanceOf(FileExtensionTagReplacer);
  });

  it('should replace [e] with .doc (itemPos=0)', () => {
    const fileExtensionTagReplacer = new FileExtensionTagReplacer();

    const actual = fileExtensionTagReplacer.getReplacement('[e]', 'example.doc', 0);
    expect(actual)
      .toEqual('.doc');
  });

  it('should replace [e] with .doc (itemPos=1)', () => {
    const fileExtensionTagReplacer = new FileExtensionTagReplacer();

    const actual = fileExtensionTagReplacer.getReplacement('[e]', 'example.doc', 1);
    expect(actual)
      .toEqual('.doc');
  });

  it('should replace [e, true] with .doc (itemPos=0)', () => {
    const fileExtensionTagReplacer = new FileExtensionTagReplacer();

    const actual = fileExtensionTagReplacer.getReplacement('[e, true]', 'example.doc', 0);
    expect(actual)
      .toEqual('.doc');
  });

  it('should replace [e, false] with doc (itemPos=0)', () => {
    const fileExtensionTagReplacer = new FileExtensionTagReplacer();

    const actual = fileExtensionTagReplacer.getReplacement('[e, false]', 'example.doc', 0);
    expect(actual)
      .toEqual('doc');
  });

  // TODO add test to test invalid second parameter. This does not work with the helper function "getReplacement".
  // TODO add test to test a string without "."
});
