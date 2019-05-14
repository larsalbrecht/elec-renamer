const path = require('path');
const NameTagReplacer = require('./NameTagReplacer');

describe('NameTagReplacer', () => {
  it('should return an instance of NameTagReplacer', () => {
    const actual = new NameTagReplacer();

    expect(actual)
      .toBeInstanceOf(NameTagReplacer);
  });

  it('should replace [n] with <file-name> (char 0 to end)', () => {
    const nameTagReplacer = new NameTagReplacer();

    const actual = nameTagReplacer.getReplacement('[n]', __filename, 0);
    expect(actual)
      .toEqual(__filename.split(path.sep)
        .pop());
  });

  it('should replace [n, 0] with <file-name> (char 0 to end)', () => {
    const nameTagReplacer = new NameTagReplacer();

    const actual = nameTagReplacer.getReplacement('[n, 0]', __filename, 0);
    expect(actual)
      .toEqual(__filename.split(path.sep)
        .pop());
  });

  it('should replace [n, 1] with <file-name> (char 1 to end)', () => {
    const nameTagReplacer = new NameTagReplacer();

    const actual = nameTagReplacer.getReplacement('[n, 1]', __filename, 0);
    expect(actual)
      .toEqual(__filename.split(path.sep)
        .pop()
        .substr(1));
  });

  it('should replace [n, 1, 5] with <file-name> (char 1 to 6)', () => {
    const nameTagReplacer = new NameTagReplacer();

    const actual = nameTagReplacer.getReplacement('[n, 1, 5]', __filename, 0);
    expect(actual)
      .toEqual(__filename.split(path.sep)
        .pop()
        .substr(1, 5));
  });

  it('should replace [n, 1000, 5] with <file-name> (char 0 to end)', () => {
    const nameTagReplacer = new NameTagReplacer();

    const actual = nameTagReplacer.getReplacement('[n, 1000, 5]', __filename, 0);
    expect(actual)
      .toEqual(__filename.split(path.sep)
        .pop());
  });

});
