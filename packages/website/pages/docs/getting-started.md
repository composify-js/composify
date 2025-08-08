# Getting Started

## Installation

Add Composify to your project using your favorite package manager:

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

:::info[Vue support is on the way 🚀]
Right now Composify works with React only. Vue support is in the works and coming soon.
:::

## Register your components

Before you can use a component in the `Editor` or `Renderer`, you need to register it in the Composify catalog.

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

Make sure this file is imported at the entry point of your app (like `index.tsx` or `app.tsx`). For more options and advanced config, see the [Catalog docs](/docs/catalog).

## Render components

Once registered, render JSX content with the `Renderer` component. Pass a JSX string to the source prop, and we will take care of the rest.

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

:::warning[No JavaScript execution]
The renderer only parses JSX — it won't run variables, functions, expressions in your source string.
:::

## Edit visually

To edit JSX in a visual way, use the `Editor` component. Just like `Renderer`, pass in your JSX string as source.

```jsx [editor.tsx]
import { Editor } from '@composify/react/editor';
import '@composify/react/style.css';

const source = `
  <div>
    <h1>Welcome to Composify!</h1>
    <Text textAlign="center">This is a simple example.</Text>
  </div>
`;

export const Page = () => (
  <Editor title="Lorem Ipsum" source={source} onSubmit={console.log} />
);
```

Don't forget to import our styles.

```jsx [editor.tsx]
import '@composify/react/style.css';
```

For more details, check out the [Editor docs](/docs/editor)
