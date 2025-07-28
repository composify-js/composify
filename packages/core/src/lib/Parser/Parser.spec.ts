import { parse } from './Parser';

describe('Parser', () => {
  it('should parse normal JSX', () => {
    expect(
      parse(
        `<Lorem ipsum={true}>
          <Dolor sit="amet">consectetur</Dolor>
          <Adipiscing />
        </Lorem>`
      )
    ).toMatchObject({
      __composify__: true,
      type: 'Lorem',
      props: { ipsum: true },
      children: [
        {
          __composify__: true,
          type: 'Dolor',
          props: { sit: 'amet' },
          children: ['consectetur'],
        },
        {
          __composify__: true,
          type: 'Adipiscing',
          props: {},
          children: [],
        },
      ],
    });
  });

  it('should parse complex JSX', () => {
    expect(
      parse(
        `<Lorem ipsum={<Dolor sit="amet">consectetur</Dolor>}>
          <Adipiscing />
        </Lorem>`
      )
    ).toMatchObject({
      __composify__: true,
      type: 'Lorem',
      props: {
        ipsum: {
          __composify__: true,
          type: 'Dolor',
          props: { sit: 'amet' },
          children: ['consectetur'],
        },
      },
      children: [
        {
          type: 'Adipiscing',
          props: {},
          children: [],
        },
      ],
    });
  });
});
