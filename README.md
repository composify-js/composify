<div align="center">
  <a href="https://composify.js.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/4b8714f6-6eb4-4069-bb97-78bac62a61b3">
      <img src="https://github.com/user-attachments/assets/5391db6a-b1ee-4653-9072-a263f587f2d6" alt="Composify" width="290" />
    </picture>
  </a>
  <p>Server Driven UI made easy</p>
  <p>
    <a href="https://www.npmjs.com/package/%40composify/react"><img src="https://img.shields.io/npm/v/@composify%2Freact.svg?style=for-the-badge&labelColor=000000" alt="NPM version" ></a>
    <a href="https://github.com/composify-js/composify/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Elastic%202.0-blue.svg?style=for-the-badge&labelColor=000000" alt="License"></a>
  </p>
  <p>
    <a href="https://composify.js.org"><b>Website</b></a>
    •
    <a href="https://composify.js.org/docs"><b>Documentation</b></a>
    •
    <a href="https://composify.js.org/demo"><b>Live Demo</b></a>
  </p>
</div>

## 👋 Introduction

Welcome to Composify!

Composify is an open-source toolkit that lets you build pages visually, using your own production components. Think of it as a WYSIWYG editor that's powered by your component library, not some generic widget set.

Engineers build components once, and Composify empowers anyone on the team—from marketing to product—to visually compose pages with them. The result is faster iteration, fewer developer bottlenecks, and a massive productivity boost for everyone.

Find out more at our [website](https://composify.js.org).

## 📖 Documentation

Visit [https://composify.js.org/docs](https://composify.js.org/docs) to view the full documentation.

## 🚀 Getting Started

### Installation

Add Composify to your project using your favorite package manager:

```bash
# npm
$ npm install @composify/react --save

# pnpm
$ pnpm add @composify/react

# yarn
$ yarn add @composify/react
```

### Register your components

Before you can use a component in the `Editor` or `Renderer`, you need to register it in the `Catalog`.

```tsx
// catalog.tsx
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

> **Important**: Make sure this catalog file is imported at the entry point of your app (like `index.tsx` or `app.tsx`) so your components are registered.

### Render your components

Once registered, you can render any JSX content with the `Renderer` component.

```tsx
// page.tsx
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

### Edit visually

To edit JSX in a visual way, use the `Editor` component.

```tsx
// editor.tsx
import { Editor } from '@composify/react/editor';
import '@composify/react/style.css';

const source = `
  <div>
    <h1>Welcome to Composify!</h1>
    <Text textAlign="center">This is a simple example.</Text>
  </div>
`;

export const Page = () => (
  <Editor title="My Page" source={source} onSubmit={console.log} />
);
```

## 🔥 Use Cases

Composify is a versatile tool that can be used in a variety of scenarios:

- **Instant UI Updates**: Push UI changes without a full redeploy.
- **Unblock Your Team**: Reduce the engineering backlog and allow non-developers to ship changes.
- **A/B Testing and Prototyping**: Test different UI variations and build high-fidelity prototypes.
- **Headless CMS**: Power your content with your own component library.
- **No-Code Tools**: Empower content and marketing teams to build their own pages.

Find out more at our [website](https://composify.js.org/docs/use-cases/instant-ui-updates).

## ☁️ Composify Cloud

For teams that want to move even faster, Composify Cloud provides a managed, hassle-free experience with features like:

- Managed hosting and unlimited bandwidth
- Real-time collaboration
- Time-travel version history
- Pay-as-you-go pricing

Learn more about [Composify Cloud →](https://composify.js.org/cloud)

## 🙌 Contributing

We welcome contributions from the community! Whether you're interested in fixing a bug, adding a new feature, or improving our documentation, we'd love to have your help.

## 📄 License

This project is licensed under the [Elastic License 2.0](LICENSE).
