# Getting Started

## Installation

Install Composify with your favorite package manager:

:::code-group
```bash [npm]
npm install @composify/react --save
```

```bash [pnpm]
pnpm add @composify/react
```

```bash [yarn]
yarn add @composify/react
```
:::

:::note[Vue support coming soon!]
Composify currently supports React only. Vue support is in the works and will be available soon.
:::

## Register components

To make your components available in the editor and renderer, you need to register them with the Composify catalog.

```jsx [catalog.tsx]
import { Catalog } from '@composify/react/renderer';
import { FC } from 'react';

type Props = {
  textAlign: 'left' | 'center' | 'right';
  children: string;
};

const Text: FC<Props> = ({ textAlign, children }) => (
  <p style={{ textAlign }}>{children}</p>
);

Catalog.register('Text', {
  component: Text,
  props: {
    textAlign: {
      label: 'Text Align',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      default: 'left',
    },
    children: {
      label: 'Text',
      type: 'string',
      default: 'Hello, world!',
    },
  },
});
```

Make sure this file is imported at the entry point of your app (like index.tsx or app.tsx). For more options and advanced config, see the [Catalog API docs](/docs/api/catalog).

## Render components

To render JSX content from your catalog, use the `Renderer` component. Just pass a JSX string to the source prop.

```jsx [page.tsx]
import { Renderer } from '@composify/react/renderer';

const source = `
  <Text textAlign="left">Hello, world!</Text>
`;

export const Page = () => (
  <Renderer source={source} />
);
```

You can also mix in any basic HTML tags — no need to register them:

```jsx [page.tsx]
import { Renderer } from '@composify/react/renderer';

const source = `
  <div>
    <h1>Welcome to Composify!</h1>
    <Text textAlign="center">This is a simple example.</Text>
  </div>
`;

export const Page = () => (
  <Renderer source={source} />
);
```

:::warning[The renderer does not evaluate JavaScript.]
You can't use variables, functions, or expressions directly in the source string.
:::

## Using editor
