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

  describe('fromData', () => {
    describe('should throw exception if item is missing', () => {
      test('replaceAll', () => {
        const data = {
          before: 'before',
          notBefore: true,
          search: 'search',
          after: 'after',
          notAfter: true,
          replace: 'replace',
        };

        expect(() => {
          BaseInputReplacer.fromData(data);
        })
          .toThrow('Not all properties exists!');
      });

      test('replace', () => {
        const data = {
          before: 'before',
          notBefore: true,
          search: 'search',
          after: 'after',
          notAfter: true,
          replaceAll: true,
        };

        expect(() => {
          BaseInputReplacer.fromData(data);
        })
          .toThrow('Not all properties exists!');
      });

      test('notAfter', () => {
        const data = {
          before: 'before',
          notBefore: true,
          search: 'search',
          after: 'after',
          replace: 'replace',
          replaceAll: true,
        };

        expect(() => {
          BaseInputReplacer.fromData(data);
        })
          .toThrow('Not all properties exists!');
      });

      test('after', () => {
        const data = {
          before: 'before',
          notBefore: true,
          search: 'search',
          notAfter: true,
          replace: 'replace',
          replaceAll: true,
        };

        expect(() => {
          BaseInputReplacer.fromData(data);
        })
          .toThrow('Not all properties exists!');
      });

      test('search', () => {
        const data = {
          before: 'before',
          notBefore: true,
          after: 'after',
          notAfter: true,
          replace: 'replace',
          replaceAll: true,
        };

        expect(() => {
          BaseInputReplacer.fromData(data);
        })
          .toThrow('Not all properties exists!');
      });

      test('notBefore', () => {
        const data = {
          before: 'before',
          search: 'search',
          after: 'after',
          notAfter: true,
          replace: 'replace',
          replaceAll: true,
        };

        expect(() => {
          BaseInputReplacer.fromData(data);
        })
          .toThrow('Not all properties exists!');
      });

      test('before', () => {
        const data = {
          notBefore: true,
          search: 'search',
          after: 'after',
          notAfter: true,
          replace: 'replace',
          replaceAll: true,
        };

        expect(() => {
          BaseInputReplacer.fromData(data);
        })
          .toThrow('Not all properties exists!');
      });
    });

    it('should return an instance of BaseInputReplacer with all data', () => {
      const allData = {
        before: 'before',
        notBefore: true,
        search: 'search',
        after: 'after',
        notAfter: true,
        replace: 'replace',
        replaceAll: true,
      };

      const actual = BaseInputReplacer.fromData(allData);

      expect(actual)
        .toBeInstanceOf(BaseInputReplacer);

      expect(actual.before)
        .toBe(allData.before);

      expect(actual.notBefore)
        .toBe(allData.notBefore);

      expect(actual.search)
        .toBe(allData.search);

      expect(actual.after)
        .toBe(allData.after);

      expect(actual.notAfter)
        .toBe(allData.notAfter);

      expect(actual.replace)
        .toBe(allData.replace);

      expect(actual.replaceAll)
        .toBe(allData.replaceAll);
    });
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

  describe('setSearch', () => {
    it('should set search', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF');

      expect(baseInputReplacer.search)
        .toBe('ABC');

      baseInputReplacer.setSearch('GHI');

      expect(baseInputReplacer.search)
        .toBe('GHI');
    });
  });

  describe('setReplace', () => {
    it('should set replace', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF');

      expect(baseInputReplacer.replace)
        .toBe('DEF');

      baseInputReplacer.setReplace('GHI');

      expect(baseInputReplacer.replace)
        .toBe('GHI');
    });
  });

  describe('setReplaceAll', () => {
    it('should set replaceAll', () => {
      const baseInputReplacer = new BaseInputReplacer('ABC', 'DEF', true);

      expect(baseInputReplacer.replaceAll)
        .toBeTruthy();

      baseInputReplacer.setReplaceAll(false);

      expect(baseInputReplacer.replaceAll)
        .toBeFalsy();
    });
  });

  describe('search and replace', () => {
    it('should replace all " " with -', () => {
      const baseInputReplacer = new BaseInputReplacer(' ', '-', true);
      const actual = baseInputReplacer.getReplacement('A B C');

      expect(actual)
        .toEqual('A-B-C');
    });
  });
});
