const ElecRenamer = require('./ElecRenamer');

describe('index.js', () => {
  it('returns new instance of Replacer', () => {
    // eslint-disable-next-line
    const PossibleElecRenamer = require('./index');
    const actual = new PossibleElecRenamer();

    expect(actual)
      .toBeInstanceOf(ElecRenamer);
  });
});
