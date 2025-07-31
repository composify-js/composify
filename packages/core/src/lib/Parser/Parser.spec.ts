import { parse, stringify } from './Parser';

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

  it('should stringify parsed node back to JSX', () => {
    const source = `<Lorem ipsum={true}><Dolor sit="amet">consectetur</Dolor></Lorem>`;
    const parsed = parse(source);

    expect(stringify(parsed)).toEqual(source);
  });

  it('should handle various attribute types', () => {
    const source = `<Foo str="bar" num={42} bool={false} arr={[1, 2]} obj={{foo: 1, bar: "baz", child: <Bar />}} elem={<Bar />}>text</Foo>`;
    const parsed = parse(source);

    expect(stringify(parsed)).toEqual(source);
  });
});
