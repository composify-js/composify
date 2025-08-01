import { parse, stringify, extractTypes } from './Parser';

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

  describe('extractTypes', () => {
    it('should return empty array for string nodes', () => {
      expect(extractTypes('some text')).toEqual([]);
    });

    it('should extract single component type', () => {
      const node = parse('<Button />');

      expect(extractTypes(node)).toEqual(['Button']);
    });

    it('should extract multiple component types from children', () => {
      const node = parse('<Container><Button /><Input /><Text>content</Text></Container>');

      expect(extractTypes(node)).toEqual(expect.arrayContaining(['Container', 'Button', 'Input', 'Text']));
      expect(extractTypes(node)).toHaveLength(4);
    });

    it('should extract component types from nested children', () => {
      const node = parse(`
        <Layout>
          <Header>
            <Navigation>
              <Link />
            </Navigation>
          </Header>
          <Main>
            <Article />
          </Main>
        </Layout>
      `);
      const types = extractTypes(node);

      expect(types).toEqual(expect.arrayContaining(['Layout', 'Header', 'Navigation', 'Link', 'Main', 'Article']));
      expect(types).toHaveLength(6);
    });

    it('should extract component types from prop values that are nodes', () => {
      const node = parse('<Modal header={<Title>Header</Title>} footer={<Button>Close</Button>}>Content</Modal>');
      const types = extractTypes(node);

      expect(types).toEqual(expect.arrayContaining(['Modal', 'Title', 'Button']));
      expect(types).toHaveLength(3);
    });

    it('should extract component types from complex nested prop values', () => {
      const node = parse(`
        <Form 
          header={<Header><Title /></Header>} 
          sidebar={<Sidebar><Menu><Item /></Menu></Sidebar>}
        >
          <Field />
        </Form>
      `);
      const types = extractTypes(node);

      expect(types).toEqual(expect.arrayContaining(['Form', 'Header', 'Title', 'Sidebar', 'Menu', 'Item', 'Field']));
      expect(types).toHaveLength(7);
    });

    it('should not duplicate component types', () => {
      const node = parse(`
        <Container>
          <Button />
          <Button />
          <Container>
            <Button />
          </Container>
        </Container>
      `);
      const types = extractTypes(node);

      expect(types).toEqual(expect.arrayContaining(['Container', 'Button']));
      expect(types).toHaveLength(2);
    });

    it('should handle Fragment components', () => {
      const node = parse('<><Button /><Input /></>');
      const types = extractTypes(node);

      expect(types).toEqual(expect.arrayContaining(['Fragment', 'Button', 'Input']));
      expect(types).toHaveLength(3);
    });

    it('should handle mixed children and prop nodes', () => {
      const node = parse(`
        <Dialog
          title={<Title>My Dialog</Title>}
          cancelButton={<Button>Cancel</Button>}
          okButton={<Button>OK</Button>}
        >
          <Content>
            <Text>Dialog content</Text>
          </Content>
        </Dialog>
      `);
      const types = extractTypes(node);

      expect(types).toEqual(expect.arrayContaining(['Dialog', 'Title', 'Button', 'Content', 'Text']));
      expect(types).toHaveLength(5);
    });

    it('should ignore non-node prop values', () => {
      const node = parse(`
        <Component 
          stringProp="value"
          numberProp={42}
          booleanProp={true}
          arrayProp={[1, 2, 3]}
          objectProp={{key: "value"}}
          nodeProp={<Child />}
        />
      `);
      const types = extractTypes(node);

      expect(types).toEqual(expect.arrayContaining(['Component', 'Child']));
      expect(types).toHaveLength(2);
    });
  });
});
