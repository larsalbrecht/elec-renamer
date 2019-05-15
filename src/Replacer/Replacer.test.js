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

  it('calls getReplacement in custom TagReplacer', () => {
    const mockReplacer = {
      getReplacement: jest.fn(() => ''),
    };

    const replacerSpy = jest.spyOn(mockReplacer, 'getReplacement');
    const replacer = new Replacer(null, [mockReplacer]);
    replacer.getReplacement();

    expect(replacerSpy)
      .toHaveBeenCalledTimes(1);
  });

  it('calls getReplacement in custom InputReplacer', () => {
    const mockReplacer = {
      getReplacement: jest.fn(() => ''),
    };

    const replacerSpy = jest.spyOn(mockReplacer, 'getReplacement');
    const replacer = new Replacer([mockReplacer]);
    replacer.getReplacement();

    expect(replacerSpy)
      .toHaveBeenCalledTimes(1);
  });
});
