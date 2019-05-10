const TagReplacerOption = require('./TagReplacerOption');

describe('TagReplacerOption', () => {
  it('should return an instance of TagReplacerOption', () => {
    const actual = new TagReplacerOption();

    expect(actual)
      .toBeInstanceOf(TagReplacerOption);
  });

  describe('type', () => {
    it('should return type given by constructor', () => {
      const tagReplacerOption = new TagReplacerOption(0);
      const actual = tagReplacerOption.getType();

      expect(actual)
        .toBe(0);
    });
  });

  describe('modifier', () => {
    it('should return modifier given by constructor', () => {
      const map = new Map([['key', 'value']]);
      const tagReplacerOption = new TagReplacerOption(0, map);
      const actual = tagReplacerOption.getModifier();

      expect(actual)
        .toBe(map);
    });
  });
});
