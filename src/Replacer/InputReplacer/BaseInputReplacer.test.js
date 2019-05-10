const BaseInputReplacer = require('./BaseInputReplacer');

describe('BaseInputReplacer', () => {
  it('should return an instance of BaseInputReplacer', () => {
    const actual = new BaseInputReplacer();

    expect(actual)
      .toBeInstanceOf(BaseInputReplacer);
  });

  it('should replace ABC with DEF in ABCDEF and return DEFDEF', () => {
    const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF');
    const actual = baseInputReplacer.getReplacement('ABCDEF');

    expect(actual)
      .toBe('DEFDEF');
  });

  describe('before', () => {
    it('should replace ABC with DEF but not with x before in xABCABCDEF and return xABCDEFDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF');
      baseInputReplacer.setBefore('x', true);
      const actual = baseInputReplacer.getReplacement('xABCABCDEF');

      expect(actual)
        .toBe('xABCDEFDEF');
    });

    it('should replace ABC with DEF but only with x before in xABCABCDEF and return xDEFABCDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF');
      baseInputReplacer.setBefore('x', false);
      const actual = baseInputReplacer.getReplacement('xABCABCDEF');

      expect(actual)
        .toBe('xDEFABCDEF');
    });

    it('should replace ABC with DEF global but not with x before in xABCABCDEF and return xABCDEFDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF', true);
      baseInputReplacer.setBefore('x', true);
      const actual = baseInputReplacer.getReplacement('xABCABCDEF');

      expect(actual)
        .toBe('xABCDEFDEF');
    });

    it('should replace ABC with DEF global but only with x before in xABCABCDEF and return xDEFABCDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF', true);
      baseInputReplacer.setBefore('x', false);
      const actual = baseInputReplacer.getReplacement('xABCABCDEF');

      expect(actual)
        .toBe('xDEFABCDEF');
    });

    it('should replace ABC with DEF global but only with x before (as default says) in xABCABCDEF and return xDEFABCDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF');
      baseInputReplacer.setBefore('x');
      const actual = baseInputReplacer.getReplacement('xABCABCDEF');

      expect(actual)
        .toBe('xDEFABCDEF');
    });
  });


  describe('after', () => {
    it('should replace ABC with DEF but not with x after in ABCxABCDEF and return ABCxDEFDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF');
      baseInputReplacer.setAfter('x', true);
      const actual = baseInputReplacer.getReplacement('ABCxABCDEF');

      expect(actual)
        .toBe('ABCxDEFDEF');
    });

    it('should replace ABC with DEF but only with x after in ABCxABCDEF and return DEFxABCDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF');
      baseInputReplacer.setAfter('x', false);
      const actual = baseInputReplacer.getReplacement('ABCxABCDEF');

      expect(actual)
        .toBe('DEFxABCDEF');
    });

    it('should replace ABC with DEF global but not with x after in ABCxABCDEF and return ABCxDEFDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF', true);
      baseInputReplacer.setAfter('x', true);
      const actual = baseInputReplacer.getReplacement('ABCxABCDEF');

      expect(actual)
        .toBe('ABCxDEFDEF');
    });

    it('should replace ABC with DEF global but only with x after in ABCxABCDEF and return DEFxABCDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF', true);
      baseInputReplacer.setAfter('x', false);
      const actual = baseInputReplacer.getReplacement('ABCxABCDEF');

      expect(actual)
        .toBe('DEFxABCDEF');
    });

    it('should replace ABC with DEF global but only with x after (as default says) in ABCxABCDEF and return DEFxABCDEF', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF', true);
      baseInputReplacer.setAfter('x');
      const actual = baseInputReplacer.getReplacement('ABCxABCDEF');

      expect(actual)
        .toBe('DEFxABCDEF');
    });
  });
});
