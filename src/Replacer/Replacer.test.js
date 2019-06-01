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

  it('should add new input replacer with addInputReplacer', () => {
    const mockReplacer = {};
    const replacer = new Replacer([{}]);

    expect(replacer.inputReplacerList)
      .toHaveLength(1);

    replacer.addInputReplacer(mockReplacer);

    expect(replacer.inputReplacerList)
      .toHaveLength(2);

    expect(replacer.inputReplacerList[1])
      .toBe(mockReplacer);
  });

  describe('setInputReplacer', () => {
    it('should set new item to list', () => {
      const mockReplacer = {};
      const replacer = new Replacer([{}]);

      expect(replacer.inputReplacerList[0])
        .not
        .toBe(mockReplacer);

      replacer.setInputReplacer(0, mockReplacer);

      expect(replacer.inputReplacerList[0])
        .toBe(mockReplacer);
    });

    it('should throw exception (list is empty, cannot replace)', () => {
      const replacer = new Replacer([]);

      expect(() => {
        replacer.setInputReplacer(0, {});
      })
        .toThrow('No index "0" exists!');
    });
  });

  describe('removeInputReplacer', () => {
    it('should throw exception with invalid index', () => {
      const replacer = new Replacer([]);

      expect(() => {
        replacer.removeInputReplacer(0);
      })
        .toThrow('No index "0" exists!');
    });

    it('should remove item from list with index', () => {
      const replacer = new Replacer([{}]);

      expect(replacer.inputReplacerList)
        .toHaveLength(1);

      replacer.removeInputReplacer(0);

      expect(replacer.inputReplacerList)
        .toHaveLength(0);
    });

    it('should remove correct item from list with index', () => {
      const mockA = {};
      const mockB = {};
      const mockC = {};
      const replacer = new Replacer([mockA, mockB, mockC]);

      expect(replacer.inputReplacerList[0])
        .toBe(mockA);
      expect(replacer.inputReplacerList[1])
        .toBe(mockB);
      expect(replacer.inputReplacerList[2])
        .toBe(mockC);

      replacer.removeInputReplacer(1);

      expect(replacer.inputReplacerList[0])
        .toBe(mockA);
      expect(replacer.inputReplacerList[1])
        .toBe(mockC);

      expect(replacer.inputReplacerList)
        .toHaveLength(2);

      replacer.removeInputReplacer(0);

      expect(replacer.inputReplacerList[0])
        .toBe(mockC);

      expect(replacer.inputReplacerList)
        .toHaveLength(1);
    });
  });

  describe('inputReplacerIndexExists', () => {
    it('should return false because index not exists (list empty)', () => {
      const replacer = new Replacer();

      const actual = replacer.inputReplacerIndexExists(0);

      expect(actual)
        .toBeFalsy();
    });

    it('should return false because index not exists (list empty; initilized with empty list)', () => {
      const replacer = new Replacer([]);

      const actual = replacer.inputReplacerIndexExists(0);

      expect(actual)
        .toBeFalsy();
    });

    it('should return false because index not exists (index to big)', () => {
      const replacer = new Replacer([{}]);

      const actual = replacer.inputReplacerIndexExists(1);

      expect(actual)
        .toBeFalsy();
    });

    it('should return false because index not exists (index to small)', () => {
      const replacer = new Replacer([{}]);

      const actual = replacer.inputReplacerIndexExists(-1);

      expect(actual)
        .toBeFalsy();
    });

    it('should return true because index exists (index 0; list = 1)', () => {
      const replacer = new Replacer([{}]);

      const actual = replacer.inputReplacerIndexExists(0);

      expect(actual)
        .toBeTruthy();
    });

    it('should return true because index exists (index 1; list = 2)', () => {
      const replacer = new Replacer([{}, {}]);

      const actual = replacer.inputReplacerIndexExists(1);

      expect(actual)
        .toBeTruthy();
    });
  });
});
