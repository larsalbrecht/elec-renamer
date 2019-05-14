const Replacer = require('./Replacer');

describe('Replacer', () => {
  it('returns new instance of Replacer', () => {
    // eslint-disable-next-line
    const actual = new Replacer();

    expect(actual)
      .toBeInstanceOf(Replacer);
  });

  it('returns promise', () => {
    const replacer = new Replacer();
    const actual = replacer.getReplacement();

    expect(actual)
      .toBeInstanceOf(Promise);
  });
});
