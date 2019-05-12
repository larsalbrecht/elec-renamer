const CounterTagReplacer = require('./CounterTagReplacer');

describe('CounterTagReplacer', () => {
  it('should return an instance of CounterTagReplacer', () => {
    const actual = new CounterTagReplacer();

    expect(actual)
      .toBeInstanceOf(CounterTagReplacer);
  });

  it('should replace [c] with 0 (itemPos=0)', () => {
    const counterTagReplacer = new CounterTagReplacer();

    const actual = counterTagReplacer.getReplacement('[c]', '', 0);
    expect(actual)
      .toEqual('0');
  });

  it('should replace [c] with 1 (itemPos=1)', () => {
    const counterTagReplacer = new CounterTagReplacer();

    const actual = counterTagReplacer.getReplacement('[c]', '', 1);
    expect(actual)
      .toEqual('1');
  });

  it('should replace [c, 5] with 5 (itemPos=0)', () => {
    const counterTagReplacer = new CounterTagReplacer();

    const actual = counterTagReplacer.getReplacement('[c, 5]', '', 0);
    expect(actual)
      .toEqual('5');
  });

  it('should replace [c, 5, 5] with 5 (itemPos=0)', () => {
    const counterTagReplacer = new CounterTagReplacer();

    const actual = counterTagReplacer.getReplacement('[c, 5, 5]', '', 0);
    expect(actual)
      .toEqual('5');
  });

  it('should replace [c, 5, 5] with 10 (itemPos=1)', () => {
    const counterTagReplacer = new CounterTagReplacer();

    const actual = counterTagReplacer.getReplacement('[c, 5, 5]', '', 1);
    expect(actual)
      .toEqual('10');
  });

  it('should replace [c, 5, 5, 2] with 05 (itemPos=0)', () => {
    const counterTagReplacer = new CounterTagReplacer();

    const actual = counterTagReplacer.getReplacement('[c, 5, 5, 2]', '', 0);
    expect(actual)
      .toEqual('05');
  });

  it('should replace [c, 5, 5, 2] with 10 (itemPos=1)', () => {
    const counterTagReplacer = new CounterTagReplacer();

    const actual = counterTagReplacer.getReplacement('[c, 5, 5, 2]', '', 1);
    expect(actual)
      .toEqual('10');
  });
});
