import Component from './Component';

describe('Component', () => {
  it('returns new instance of Component', () => {
    // eslint-disable-next-line
    const actual = new Component();

    expect(actual)
      .toBeInstanceOf(Component);
  });

  it.skip('should have an function called render in Component', () => {

  });

  it.skip('should take elements to Component', () => {

  });
});
