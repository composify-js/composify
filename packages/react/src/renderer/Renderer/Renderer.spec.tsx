import { cleanup, render } from '@testing-library/react';
import { createElement, ReactNode } from 'react';
import { Catalog, Node } from '../../renderer';
import { Renderer } from './Renderer';

describe('Renderer', () => {
  afterEach(cleanup);

  it('should render basic element', () => {
    const source = `
      <div>
        Hello world!
      </div>
    `;

    const { getByText } = render(<Renderer source={source} />);

    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('with custom pragma', () => {
    const source = `
        <div>
          Hello world!
        </div>
      `;

    const pragma = {
      jsx: (
        type: Parameters<typeof createElement>[0],
        props: Parameters<typeof createElement>[1],
        _: Node,
        ...children: ReactNode[]
      ) =>
        createElement('div', null, [
          createElement('div', { key: 1 }, 'custom pragma'),
          createElement(type, { ...props, key: 2 }, children),
        ]),
    };

    const { getByText } = render(<Renderer source={source} pragma={pragma} />);

    expect(getByText('Hello world!')).toBeTruthy();
    expect(getByText('custom pragma')).toBeTruthy();
  });

  it('should render basic element with children', () => {
    const source = `
      <div>
        <h1>Hello world!</h1>
      </div>
    `;

    const { getByText } = render(<Renderer source={source} />);

    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('should render React component', () => {
    const Title = (props: { children: string }) => <h1>{props.children}</h1>;

    Catalog.register('Title', {
      component: Title,
      props: {
        children: {
          label: 'children',
          type: 'text',
        },
      },
    });

    const source = `
      <Title>
        Hello world!
      </Title>
    `;

    const { getByText } = render(<Renderer source={source} />);

    expect(getByText('Hello world!')).toBeTruthy();
  });
});
