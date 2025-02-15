import { Catalog } from '@composify/core';
import { cleanup, render as testRender } from '@testing-library/react';
import { render } from './render';

describe('render', () => {
  afterEach(cleanup);

  it('should render basic element', () => {
    const content = `
      <div>
        Hello world!
      </div>
    `;

    const { getByText } = testRender(render(content));

    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('should render basic element with children', () => {
    const content = `
      <div>
        <h1>Hello world!</h1>
      </div>
    `;

    const { getByText } = testRender(render(content));

    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('should render React component', () => {
    const Title = (props: { children: string }) => <h1>{props.children}</h1>;

    Catalog.register('Title', Title);

    const content = `
      <Title>
        Hello world!
      </Title>
    `;

    const { getByText } = testRender(render(content));

    expect(getByText('Hello world!')).toBeTruthy();
  });
});
