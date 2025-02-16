import { Catalog } from '@composify/core';
import { cleanup, render } from '@testing-library/react';
import { Parcel } from './Parcel';

describe('Parcel', () => {
  afterEach(cleanup);

  it('should render basic element', () => {
    const source = `
      <div>
        Hello world!
      </div>
    `;

    const { getByText } = render(<Parcel source={source} />);

    expect(getByText('Hello world!')).toBeTruthy();
  });

  it('should render basic element with children', () => {
    const source = `
      <div>
        <h1>Hello world!</h1>
      </div>
    `;

    const { getByText } = render(<Parcel source={source} />);

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

    const { getByText } = render(<Parcel source={source} />);

    expect(getByText('Hello world!')).toBeTruthy();
  });
});
