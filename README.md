<div align="center">
  <a href="https://composify.js.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/composify-js/composify/blob/main/packages/docs/public/brand/logo-dark.png?raw=true">
      <img src="https://github.com/composify-js/composify/blob/main/packages/docs/public/brand/logo-light.png?raw=true" alt="Composify" width="290" />
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

## Introduction

Composify is a visual page builder for React that works with your own components.

Most WYSIWYG editors force you to use their generic component set. Composify takes a different approach—you register your production components once, and then anyone on your team can use them to build pages visually. Your design system stays intact, but now marketing and content teams can compose pages without filing tickets.

It's just a React component, so it works with Next.js, Remix, or any React environment. You own your data and there's no vendor lock-in.

Check out the [live demo](https://composify.js.org/demo) to see it in action.

## Getting Started

### Installation

Install Composify with your preferred package manager:

```bash
# npm
$ npm install @composify/react --save

# pnpm
$ pnpm add @composify/react

# yarn
$ yarn add @composify/react
```

### Register Your Components

Before you can use a component in the `Editor` or `Renderer`, you need to register it in the `Catalog`.

Let's say you have a simple text component:

```tsx
// components/Text.tsx
import { FC } from 'react';
 
type Props = {
  textAlign: 'left' | 'center' | 'right';
  children: string;
};
 
const Text: FC<Props> = ({ textAlign, children }) => (
  <p style={{ textAlign }}>{children}</p>
);

export default Text;
```

Now register it:

```tsx
// catalog.tsx
import { Catalog } from '@composify/react/renderer';
import Text from '@/components/Text';

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

> **Important**: Make sure to import this catalog file at your app's entry point (like `index.tsx` or `_app.tsx`) so your components are registered before the app renders.

### Render Your Components

Once registered, you can render JSX from a string using the `Renderer` component:

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

### Edit Visually

To enable visual editing, use the `Editor` component:

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

The `Editor` provides a visual interface where users can drag, drop, and configure components without touching code.

## Why Use Composify?

We built Composify to solve a common problem: engineers build component libraries, but only engineers can use them effectively. Here are some scenarios where Composify helps:

- **Ship UI changes without deployments** — Need to update a landing page or promotional banner? Push changes instantly without waiting for CI/CD pipelines or redeployments.

- **Reduce engineering bottlenecks** — Marketing teams can update content and layouts themselves instead of creating tickets and waiting for developers. This frees up engineering time for actual feature work.

- **A/B testing made simple** — Test different UI variations without code changes or complex feature flag setups.

- **Rapid prototyping** — Build high-fidelity prototypes using your actual production components, not placeholder widgets. What you prototype is what you ship.

- **Better than headless CMS** — Traditional CMSs give you generic WYSIWYG editors. Composify lets you work with your own design system, so everything stays consistent.

- **No-code tools for your team** — Empower content and product teams to build their own pages using components that engineers have already built and tested.

There's more detail on specific use cases in the [documentation](https://composify.js.org/docs/use-cases/instant-ui-updates).

## Composify Cloud

If you want a hosted version with collaboration features, [Composify Cloud](https://composify.js.org/cloud) provides:

- **Managed hosting** — No infrastructure to manage, unlimited bandwidth
- **Real-time collaboration** — Multiple team members can edit the same page simultaneously
- **Version history** — Time-travel through changes and restore previous versions

## Documentation

Full documentation is available at [composify.js.org/docs](https://composify.js.org/docs).

## Contributing

We welcome contributions to Composify! Whether you're fixing bugs, adding features, or improving docs, pull requests and issues are always welcome.

## License

This project is licensed under the [Elastic License 2.0](LICENSE). It's free to use for most cases, with some restrictions on offering Composify as a hosted service. See the license file for details.
