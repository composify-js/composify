import { Catalog } from '@composify/core';
import { cleanup, render as testRender } from '@testing-library/react';
import { Attributes, createElement, ReactNode } from 'react';
import { render } from './render';

describe('render', () => {
  afterEach(cleanup);

  it('should render basic element', () => {
    const source = `
      <div>
        Hello world!
      </div>
    `;

    const { getByText } = testRender(render(source));

    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('with custom pragma', () => {
    const source = `
      <div>
        Hello world!
      </div>
    `;

    const pragma = {
      jsx: (type: string, props: Attributes | null, ...children: ReactNode[]) =>
        createElement('div', null, [
          createElement('div', { key: 1 }, 'custom pragma'),
          createElement(type, { ...props, key: 2 }, children),
        ]),
    };

    const { getByText } = testRender(render(source, pragma));

    expect(getByText('Hello world!')).toBeTruthy();
    expect(getByText('custom pragma')).toBeTruthy();
  });

  it('should render basic element with children', () => {
    const source = `
      <div>
        <h1>Hello world!</h1>
      </div>
    `;

    const { getByText } = testRender(render(source));

    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('should render React component', () => {
    const Title = (props: { children: string }) => <h1>{props.children}</h1>;

    Catalog.register('Title', Title);

    const source = `
      <Title>
        Hello world!
      </Title>
    `;

    const { getByText } = testRender(render(source));

    expect(getByText('Hello world!')).toBeTruthy();
  });
});
