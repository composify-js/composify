import { parse } from './Parser';

describe('Parser', () => {
  it('should parse', () => {
    expect(
      parse(
        `<Lorem ipsum={true}>
          <Dolor sit="amet">consectetur</Dolor>
          <Adipiscing />
        </Lorem>`
      )
    ).toMatchObject({
      type: 'Lorem',
      props: { ipsum: true },
      children: [
        {
          type: 'Dolor',
          props: { sit: 'amet' },
          children: ['consectetur'],
        },
        {
          type: 'Adipiscing',
          props: {},
          children: [],
        },
      ],
    });
  });
});
