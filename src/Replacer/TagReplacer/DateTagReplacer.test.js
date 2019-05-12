const { format } = require('date-fns');
const DateTagReplacer = require('./DateTagReplacer');

describe('DateTagReplacer', () => {
  it('should return an instance of DateTagReplacer', () => {
    const actual = new DateTagReplacer();

    expect(actual)
      .toBeInstanceOf(DateTagReplacer);
  });

  it('should replace [d] with current date in format (YYYY-MM-DD) (itemPos=0)', () => {
    const dateTagReplacer = new DateTagReplacer();

    const actual = dateTagReplacer.getReplacement('[d]', '', 0);
    expect(actual)
      .toEqual(format(new Date(), 'YYYY-MM-DD'));
  });

  it('should replace [d] with current date in format (YYYY-MM-DD) (itemPos=1)', () => {
    const dateTagReplacer = new DateTagReplacer();

    const actual = dateTagReplacer.getReplacement('[d]', '', 1);
    expect(actual)
      .toEqual(format(new Date(), 'YYYY-MM-DD'));
  });

  it('should replace [d, YYYY-MM-DD] with current date in format (YYYY-MM-DD) (itemPos=1)', () => {
    const dateTagReplacer = new DateTagReplacer();

    const actual = dateTagReplacer.getReplacement('[d, YYYY-MM-DD]', '', 1);
    expect(actual)
      .toEqual(format(new Date(), 'YYYY-MM-DD'));
  });

  it('should replace [d, YYYY] with current date in format (YYYY) (itemPos=0)', () => {
    const dateTagReplacer = new DateTagReplacer();

    const actual = dateTagReplacer.getReplacement('[d, YYYY]', '', 0);
    expect(actual)
      .toEqual(format(new Date(), 'YYYY'));
  });

  it('should replace [d, asdas] (invalid) with current date in format (YYYY-MM-DD) (itemPos=0)', () => {
    const dateTagReplacer = new DateTagReplacer();

    const actual = dateTagReplacer.getReplacement('[d, ÖÄÜ]', '', 0);
    expect(actual)
      .toEqual(format(new Date(), 'YYYY-MM-DD'));
  });
});
