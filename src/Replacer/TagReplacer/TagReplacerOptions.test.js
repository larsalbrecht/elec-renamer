const TagReplacerOptions = require('./TagReplacerOptions');

describe('TagReplacerOptions', () => {
  it('should return an instance of TagReplacerOptions', () => {
    const actual = new TagReplacerOptions();

    expect(actual)
      .toBeInstanceOf(TagReplacerOptions);
  });

  describe('isHasEndTag', () => {
    it('should return isHasEndTag given default by constructor', () => {
      const actual = new TagReplacerOptions().isHasEndTag();

      expect(actual)
        .toBe(false);
    });

    it('should return isHasEndTag given by constructor', () => {
      const actual = new TagReplacerOptions(true).isHasEndTag();

      expect(actual)
        .toBe(true);
    });
  });

  describe('option', () => {
    it('should return default options', () => {
      const tagReplacerOptions = new TagReplacerOptions();
      expect(tagReplacerOptions.getOptions())
        .toHaveLength(0);
    });

    it('should return given option in list', () => {
      const option = { foo: 'bar' };

      const tagReplacerOptions = new TagReplacerOptions();
      tagReplacerOptions.addOption(option);
      const actual = tagReplacerOptions.getOptions();

      expect(actual)
        .toHaveLength(1);

      expect(actual)
        .toStrictEqual([option]);
    });
  });
});
