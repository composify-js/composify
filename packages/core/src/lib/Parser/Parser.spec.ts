import { parse } from './Parser';

describe('Parser', () => {
  it('should parse', () => {
    expect(
      parse(`
      <Lorem ipsum={true}>
        <Dolor sit="amet">consectetur</Dolor>
        <Adipiscing />
      </Lorem>
    `)
    ).toMatchObject(['Lorem', { ipsum: true }, ['Dolor', { sit: 'amet' }, 'consectetur'], ['Adipiscing', {}]]);
  });
});
