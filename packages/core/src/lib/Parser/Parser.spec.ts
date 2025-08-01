import { parse, stringify } from './Parser';

describe('Parser', () => {
  describe('parse', () => {
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

    it('should throw error for multiple root nodes', () => {
      expect(() => parse('<div></div><span></span>')).toThrow(
        'Adjacent JSX elements must be wrapped in an enclosing tag'
      );
    });

    it('should throw error for non-expression root nodes', () => {
      expect(() => parse('const x = 1;')).toThrow('Expected an expression statement, but got: VariableDeclaration');
    });
  });

  describe('stringify', () => {
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
});
