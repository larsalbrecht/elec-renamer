const Replacer = require('./Replacer');

describe('index.js', () => {
  it('returns new instance of Replacer', () => {
    // eslint-disable-next-line
    const PossibleReplacer = require('./index');
    const actual = new PossibleReplacer();

    expect(actual)
      .toBeInstanceOf(Replacer);
  });
});
