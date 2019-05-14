const path = require('path');
const FolderTagReplacer = require('./FolderTagReplacer');

describe('FolderTagReplacer', () => {
  it('should return an instance of FolderTagReplacer', () => {
    const actual = new FolderTagReplacer();

    expect(actual)
      .toBeInstanceOf(FolderTagReplacer);
  });

  it('should replace [f] with <parent-directory-path> (itemPos=0)', () => {
    const folderTagReplacer = new FolderTagReplacer();

    const actual = folderTagReplacer.getReplacement('[f]', __filename, 0);
    expect(actual)
      .toEqual(path.dirname(__filename)
        .split(path.sep)
        .pop());
  });

  it('should replace [f] with "" (itemPos=0)', () => {
    const folderTagReplacer = new FolderTagReplacer();

    const actual = folderTagReplacer.getReplacement('[f]', '/', 0);
    expect(actual)
      .toEqual('');
  });

  it('should replace [f, 0] with <parent-directory-path> (itemPos=0)', () => {
    const folderTagReplacer = new FolderTagReplacer();

    const actual = folderTagReplacer.getReplacement('[f, 0]', __filename, 0);
    expect(actual)
      .toEqual(path.dirname(__filename)
        .split(path.sep)
        .pop());
  });

  it('should replace [f, 1] with <parent-parent-directory-path> (itemPos=0)', () => {
    const folderTagReplacer = new FolderTagReplacer();

    const actual = folderTagReplacer.getReplacement('[f, 1]', __filename, 0);
    expect(actual)
      .toEqual(path.dirname(__filename)
        .split(path.sep)
        .slice(-2, -1)
        .pop());
  });

  it('should replace [f, 0, 0] with <parent-directory-path> (char 0 to end) (itemPos=0)', () => {
    const folderTagReplacer = new FolderTagReplacer();

    const actual = folderTagReplacer.getReplacement('[f, 0, 0]', __filename, 0);
    expect(actual)
      .toEqual(path.dirname(__filename)
        .split(path.sep)
        .pop());
  });

  it('should replace [f, 0, 1] with <parent-directory-path> (char 1 to end) (itemPos=0)', () => {
    const folderTagReplacer = new FolderTagReplacer();

    const actual = folderTagReplacer.getReplacement('[f, 0, 1]', __filename, 0);
    expect(actual)
      .toEqual(path.dirname(__filename)
        .split(path.sep)
        .pop()
        .substring(1));
  });

  it('should replace [f, 0, 1, 5] with <parent-directory-path> (char 1 to 6) (itemPos=0)', () => {
    const folderTagReplacer = new FolderTagReplacer();

    const actual = folderTagReplacer.getReplacement('[f, 0, 1, 5]', __filename, 0);
    expect(actual)
      .toEqual(path.dirname(__filename)
        .split(path.sep)
        .pop()
        .substring(1, 5));
  });

  it('should replace [f, 0, 1000, 5] with <parent-directory-path> (char 0 to end) (itemPos=0)', () => {
    const folderTagReplacer = new FolderTagReplacer();

    const actual = folderTagReplacer.getReplacement('[f, 0, 1000, 5]', __filename, 0);
    expect(actual)
      .toEqual(path.dirname(__filename)
        .split(path.sep)
        .pop());
  });
});
