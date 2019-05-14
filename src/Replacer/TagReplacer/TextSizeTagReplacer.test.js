const TextSizeTagReplacer = require('./TextSizeTagReplacer');

describe('TextSizeTagReplacer', () => {
  it('should return an instance of TextSizeTagReplacer', () => {
    const actual = new TextSizeTagReplacer();

    expect(actual)
      .toBeInstanceOf(TextSizeTagReplacer);
  });

  it('should replace [ts, u]abc[/ts] with ABC', async () => {
    const textSizeTagReplacer = new TextSizeTagReplacer();
    const actual = await textSizeTagReplacer.getReplacement('[ts, u]abc[/ts]', '', 0);
    expect(actual)
      .toEqual('ABC');
  });

  it('should replace [ts, l]ABC[/ts] with abc', async () => {
    const textSizeTagReplacer = new TextSizeTagReplacer();
    const actual = await textSizeTagReplacer.getReplacement('[ts, l]ABC[/ts]', '', 0);
    expect(actual)
      .toEqual('abc');
  });

  it('should replace [ts, wu]abc abc abc abc[/ts] with Abc Abc Abc Abc', async () => {
    const textSizeTagReplacer = new TextSizeTagReplacer();
    const actual = await textSizeTagReplacer.getReplacement('[ts, wu]abc abc abc abc[/ts]', '', 0);
    expect(actual)
      .toEqual('Abc Abc Abc Abc');
  });

  it('should replace [ts, wl]ABC ABC ABC ABC[/ts] with aBC aBC aBC aBC', async () => {
    const textSizeTagReplacer = new TextSizeTagReplacer();
    const actual = await textSizeTagReplacer.getReplacement('[ts, wl]ABC ABC ABC ABC[/ts]', '', 0);
    expect(actual)
      .toEqual('aBC aBC aBC aBC');
  });
});
