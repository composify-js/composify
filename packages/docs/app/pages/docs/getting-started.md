# Getting Started

## Installation

Install Composify using your preferred package manager:

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
Right now, Composify works with React only. Vue support is in the works and will be coming soon.
:::

## 1. Register your components

Before you can use a component in the `Editor` or `Renderer`, you'll need to register it in the catalog.

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

**Important**: You must import this catalog file at your app's entry point (like `index.tsx`, `_app.tsx`, or `layout.tsx`) so the registration happens before the app tries to render anything.

For more options and advanced configurations, check out the [Catalog docs](/docs/catalog).

## 2. Render content

Once registered, you can render them using the `Renderer` component. Just pass a JSX string to the `source` prop.

```jsx [page.tsx]
import { Renderer } from '@composify/react/renderer';

const source = `
  <Text textAlign="left">Hello, world!</Text>
`;

export const Page = () => (
  <Renderer source={source} />
);
```

You can also mix in basic HTML tags without registering them:

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
The renderer only parses JSX. It won't run any variables, functions, or JavaScript expressions in your source string.
:::

## 3. Enable visual editing

To let users edit the content, use the `Editor` component. It takes the same source string but wraps it in an interactive workspace.

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

Make sure to import the editor styles:

```jsx [editor.tsx]
import '@composify/react/style.css';
```

For more details, check out the [Editor docs](/docs/editor)

## Next Steps

Now that you have the basics running:

1. **Build a robust Catalog**: Learn about all the [Property Types](/docs/catalog) available (children, objects, arrays).
2. **Save your data**: Connect the `onSubmit` callback to your API.
3. **Try Cloud**: If you don't want to build the backend storage and collaboration layer yourself, check out [Composify Cloud](/cloud).
