const Replacer = require('./Replacer');

describe('index.js', () => {
  it('returns new instance of Replacer', () => {
    // eslint-disable-next-line
    const possibleReplacer = require('./index');
    const actual = possibleReplacer();

    expect(actual)
      .toBeInstanceOf(Replacer);
  });
});
