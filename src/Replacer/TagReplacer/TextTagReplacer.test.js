const TextTagReplacer = require('./TextTagReplacer');

describe('TextTagReplacer', () => {
  it('should return an instance of TextTagReplacer', () => {
    const actual = new TextTagReplacer();

    expect(actual)
      .toBeInstanceOf(TextTagReplacer);
  });

  it('should replace [t, "abc"] with abc (itemPos=0)', () => {
    const textTagReplacer = new TextTagReplacer();

    const actual = textTagReplacer.getReplacement('[t, "abc"]', '', 0);
    expect(actual)
      .toEqual('abc');
  });

  it('should replace [t, "a"bc"] with a"bc (itemPos=0)', () => {
    const textTagReplacer = new TextTagReplacer();

    const actual = textTagReplacer.getReplacement('[t, "a"bc"]', '', 0);
    expect(actual)
      .toEqual('a"bc');
  });

  it('should replace [t, "a"b"c"] with a"b"c (itemPos=0)', () => {
    const textTagReplacer = new TextTagReplacer();

    const actual = textTagReplacer.getReplacement('[t, "a"b"c"]', '', 0);
    expect(actual)
      .toEqual('a"b"c');
  });

  it('should replace [t, abc] with abc (itemPos=0)', () => {
    const textTagReplacer = new TextTagReplacer();

    const actual = textTagReplacer.getReplacement('[t, abc]', '', 0);
    expect(actual)
      .toEqual('abc');
  });
});
