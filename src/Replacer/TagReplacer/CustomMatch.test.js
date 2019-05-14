const CustomMatch = require('./CustomMatch');

describe('CustomMatch', () => {
  it('should return an instance of CustomMatch', () => {
    const actual = new CustomMatch();

    expect(actual)
      .toBeInstanceOf(CustomMatch);
  });

  it('should return matches given from constructor', () => {
    const inputData = ['FooBar', 'Foo', 'Bar'];
    const customMatch = new CustomMatch(inputData);

    const actual = customMatch.matches;
    expect(actual)
      .toBe(inputData);
  });

  it('should return matches with group', () => {
    const customMatch = new CustomMatch(['FooBar', 'Foo', 'Bar']);

    const actual = customMatch.group(1);
    expect(actual)
      .toEqual('Foo');
  });
});
