const Pattern = require('./Pattern');

describe('Pattern', () => {
  it('should return empty string for invalid text', () => {
    expect(Pattern.quote(undefined))
      .toBe('');

    expect(Pattern.quote(null))
      .toBe('');

    expect(Pattern.quote({}))
      .toBe('');

    expect(Pattern.quote([]))
      .toBe('');
  });
  it('should escape string for regular expression', () => {
    expect(Pattern.quote('-'))
      .toBe('\\-');

    expect(Pattern.quote('.'))
      .toBe('\\.');

    expect(Pattern.quote('*'))
      .toBe('\\*');

    expect(Pattern.quote('+'))
      .toBe('\\+');

    expect(Pattern.quote('?'))
      .toBe('\\?');

    expect(Pattern.quote('^'))
      .toBe('\\^');

    expect(Pattern.quote('$'))
      .toBe('\\$');

    expect(Pattern.quote('{'))
      .toBe('\\{');

    expect(Pattern.quote('}'))
      .toBe('\\}');

    expect(Pattern.quote('('))
      .toBe('\\(');

    expect(Pattern.quote(')'))
      .toBe('\\)');

    expect(Pattern.quote('|'))
      .toBe('\\|');

    expect(Pattern.quote('['))
      .toBe('\\[');

    expect(Pattern.quote(']'))
      .toBe('\\]');

    expect(Pattern.quote('\\'))
      .toBe('\\\\');

    expect(Pattern.quote('|This [is] a {simple} Test|'))
      .toBe('\\|This\\ \\[is\\]\\ a\\ \\{simple\\}\\ Test\\|');

    expect(Pattern.quote('a'))
      .toBe('a');

    expect(Pattern.quote('foo'))
      .toBe('foo');
  });
});
