const CounterTagReplacer = require('./CounterTagReplacer');

describe('CounterTagReplacer', () => {
  it('should return an instance of CounterTagReplacer', () => {
    const actual = new CounterTagReplacer();

    expect(actual)
      .toBeInstanceOf(CounterTagReplacer);
  });
});
