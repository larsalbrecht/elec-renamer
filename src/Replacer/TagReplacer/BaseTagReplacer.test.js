const BaseTagReplacer = require('./BaseTagReplacer');
const TagReplacerOptionKeys = require('./TagReplacerOptionKeys');
const TagReplacerOption = require('./__mocks__/TagReplacerOption');

afterEach(() => {
  jest.clearAllMocks();
});

describe('BaseTagReplacer', () => {
  it('should return an instance of BaseTagReplacer', () => {
    const actual = new BaseTagReplacer();

    expect(actual)
      .toBeInstanceOf(BaseTagReplacer);
  });

  it('should return shortTag given from constructor', () => {
    const shortTag = 'e';
    const baseTagReplacer = new BaseTagReplacer(shortTag);

    const actual = baseTagReplacer.shortTag;
    expect(actual)
      .toBe(shortTag);
  });

  it('should return longTag given from constructor', () => {
    const longTag = 'example';
    const baseTagReplacer = new BaseTagReplacer('', longTag);

    const actual = baseTagReplacer.longTag;
    expect(actual)
      .toBe(longTag);
  });

  it('should return null for not set options', () => {
    const baseTagReplacer = new BaseTagReplacer();

    const actual = baseTagReplacer.options;
    expect(actual)
      .toBeNull();
  });

  it('should return given options for set options', () => {
    const options = {};
    const baseTagReplacer = new BaseTagReplacer();
    baseTagReplacer.setOptions(options);

    const actual = baseTagReplacer.options;
    expect(actual)
      .toBe(options);
  });

  it('should return quoted string in getQuotedJoinedArray(|, <items>)', () => {
    const items1 = ['A', '1', '[B]', '(C)'];
    const actual1 = BaseTagReplacer.getQuotedJoinedArray('|', items1);

    expect(actual1)
      .toBe('A|1|\\[B\\]|\\(C\\)');


    const items2 = ['A'];
    const actual2 = BaseTagReplacer.getQuotedJoinedArray('|', items2);

    expect(actual2)
      .toBe('A');
  });

  describe('generateOptionsPatternString', () => {
    it('should return empty optionsPatternString in generateOptionsPatternString with no data', () => {
      const baseTagReplacer = new BaseTagReplacer();

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toBe('');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (invalid|no modifiers)', () => {
      TagReplacerOption.getType.mockImplementation(() => -1);

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*)?');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_INT|no modifiers)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_INT);

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*([0-9]{1,9}))?');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_FLOAT|no modifiers)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_FLOAT);

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*([0-9]+[\\.\\,]{1}[0-9]+))?');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_BOOL|no modifiers)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_BOOL);

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*(true|false))?');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_DATE|no modifiers)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_DATE);

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*(.+?))?');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_STRING|no modifiers)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_STRING);

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*(.*?))?');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_STRING|required=true)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_STRING);
      TagReplacerOption.getModifier.mockImplementation(jest.fn(() => new Map([['required', true]])));

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*(.*?)){1}');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_STRING|required=false)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_STRING);
      TagReplacerOption.getModifier.mockImplementation(jest.fn(() => new Map([['required', false]])));

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*(.*?))?');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_STRINGLIST|case insensitive)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_STRINGLIST);
      TagReplacerOption.getModifier.mockImplementation(jest.fn(() => new Map([['case-sensitive', false], ['list', 'A|B|C']])));

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*((?:A|\\||B|\\||C)))?');
    });

    it('should return optionsPatternString in generateOptionsPatternString with options data set (TYPE_STRINGLIST|case sensitive)', () => {
      TagReplacerOption.getType.mockImplementation(() => TagReplacerOptionKeys.TYPE_STRINGLIST);
      TagReplacerOption.getModifier.mockImplementation(jest.fn(() => new Map([['case-sensitive', true], ['list', 'A|B|C']])));

      const baseTagReplacer = new BaseTagReplacer();
      // noinspection JSCheckFunctionSignatures
      baseTagReplacer.setOptions({ getOptions: () => ([TagReplacerOption]) });

      const actual = baseTagReplacer.generateOptionsPatternString();
      expect(actual)
        .toEqual('\\W*(?:,\\W*((?:A|\\||B|\\||C)))?');
    });
  });

  describe('generatePatternString', () => {
    it('should call generateOptionsPatternString within generatePatternString', () => {
      const baseTagReplacer = new BaseTagReplacer('e', 'example');
      const spy = jest.spyOn(baseTagReplacer, 'generateOptionsPatternString');

      baseTagReplacer.generatePatternString();

      expect(spy)
        .toHaveBeenCalledTimes(1);
    });

    it('should return pattern in generatePatternString (Tag: e|example)', () => {
      const baseTagReplacer = new BaseTagReplacer('e', 'example');

      const actual = baseTagReplacer.generatePatternString();
      expect(actual)
        .toBe('\\[\\W*((?:e|E|example|EXAMPLE)){1}\\W*\\]');
    });

    it('should return pattern in generatePatternString (Tag: ex|ex-ample)', () => {
      const baseTagReplacer = new BaseTagReplacer('ex', 'ex-ample');

      const actual = baseTagReplacer.generatePatternString();
      expect(actual)
        .toBe('\\[\\W*((?:ex|EX|ex\\-ample|EX\\-AMPLE)){1}\\W*\\]');
    });

    it('should return pattern without end tag in generatePatternString (Tag: e|example) with isHasEndTag false', () => {
      const baseTagReplacer = new BaseTagReplacer('e', 'example');
      const options = {
        isHasEndTag: () => false,
        getOptions: () => null,
      };
      baseTagReplacer.setOptions(options);

      const actual = baseTagReplacer.generatePatternString();
      expect(actual)
        .toBe('\\[\\W*((?:e|E|example|EXAMPLE)){1}\\W*\\]');
    });

    it('should return pattern with end tag in generatePatternString (Tag: e|example) with isHasEndTag true', () => {
      const baseTagReplacer = new BaseTagReplacer('e', 'example');
      const options = {
        isHasEndTag: () => true,
        getOptions: () => null,
      };
      baseTagReplacer.setOptions(options);

      const actual = baseTagReplacer.generatePatternString();
      expect(actual)
        .toBe('\\[\\W*((?:e|E|example|EXAMPLE)){1}\\W*\\](.+?)(?:(?:\\[\\W*((?:e|E|example|EXAMPLE)){1}\\W*\\])|(?:$))');
    });
  });

  describe('replace', () => {
    it('should throw an error', () => {
      const baseTagReplacer = new BaseTagReplacer();

      expect(() => {
        baseTagReplacer.replace();
      })
        .toThrow('Must be overridden!');
    });
  });

  describe('getRegExp', () => {
    it('should return RegExp', () => {
      const baseTagReplacer = new BaseTagReplacer();
      baseTagReplacer.generatePatternString = () => '';

      const actual = baseTagReplacer.getRegExp();

      expect(actual)
        .toBeInstanceOf(RegExp);
    });

    it('should throw exception on invalid RegExp', () => {
      const baseTagReplacer = new BaseTagReplacer();
      baseTagReplacer.generatePatternString = () => '[';

      expect(() => {
        baseTagReplacer.getRegExp();
      })
        .toThrow(/Error while generating RegExp: /);
    });

    it('should not generate RegExp twice on second call', () => {
      const baseTagReplacer = new BaseTagReplacer();
      baseTagReplacer.generatePatternString = jest.fn(() => '');

      const spy = jest.spyOn(baseTagReplacer, 'generatePatternString');

      baseTagReplacer.getRegExp();

      expect(spy)
        .toHaveBeenCalledTimes(1);

      baseTagReplacer.getRegExp();

      expect(spy)
        .toHaveBeenCalledTimes(1);
    });
  });

  describe('getReplacement', () => {
    it('should throw an error when getRegExp throw an error', () => {
      const baseTagReplacer = new BaseTagReplacer();
      baseTagReplacer.generatePatternString = jest.fn(() => { throw new Error('RegExp could not be generated: '); });
      expect(() => {
        baseTagReplacer.getReplacement();
      })
        .toThrow(/RegExp could not be generated: /);
    });

    it('should return inputString without match', () => {
      const baseTagReplacer = new BaseTagReplacer();
      baseTagReplacer.getRegExp = () => new RegExp(/NOT/);

      const actual = baseTagReplacer.getReplacement('input');

      expect(actual)
        .toEqual('input');
    });

    it('should not call replace without match', () => {
      const baseTagReplacer = new BaseTagReplacer();
      baseTagReplacer.getRegExp = () => new RegExp(/NOT/);
      baseTagReplacer.replace = jest.fn(() => '');

      const spy = jest.spyOn(baseTagReplacer, 'generatePatternString');

      baseTagReplacer.getReplacement('input');

      expect(spy)
        .toHaveBeenCalledTimes(0);
    });

    it('should call replace for each match', () => {
      const baseTagReplacer = new BaseTagReplacer();
      baseTagReplacer.getRegExp = () => new RegExp(/[0-9]/);

      let calls = 0;
      // eslint-disable-next-line
      baseTagReplacer.replace = jest.fn(() => (++calls === 10 ? '' : calls).toString());

      const spy = jest.spyOn(baseTagReplacer, 'replace');

      baseTagReplacer.getReplacement('0123456789');

      expect(spy)
        .toHaveBeenCalledTimes(10);
    });
  });
});
