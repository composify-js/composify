<div align="center">
  <a href="https://composify.js.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/composify-js/composify/blob/main/packages/docs/app/public/brand/logo-dark.png?raw=true">
      <img src="https://github.com/composify-js/composify/blob/main/packages/docs/app/public/brand/logo-light.png?raw=true" alt="Composify" width="290" />
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

Composify is an open-source library that adds a visual editor to your React application. It lets non-developers build pages using your existing production components, so engineers can focus on actual feature work.

Most visual builders force you into a binary choice: use a rigid page builder with generic components (Wix, Squarespace) or adopt a complex headless CMS that requires modifying your code to fit their platform (Builder.io, Puck, Storyblok).

Composify sits in the middle. It is a visual interface for your actual component code. Register your components once, and anyone on your team can use them to build pages visually. Your design system stays intact. Marketing and content teams compose pages without filing tickets.

It's just a React library. Works with Next.js, Remix, or any React environment. You own your data.

Check out the [live demo](https://composify.js.org/demo) to see it in action.

## Getting Started

### Installation

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

```tsx
// catalog.tsx
import { Catalog } from '@composify/react/renderer';

const Text = ({ textAlign, children }) => (
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

**Important**: Import this catalog file at your app's entry point (like `index.tsx` or `_app.tsx`) so the registration happens before the app renders.

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

To let users edit the content, use the `Editor` component:

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

Users can drag and drop components, modify props via the sidebar, and nest elements. Upon save, the editor serializes the tree back into a clean JSX string.

## Why Composify?

We built Composify to solve a common problem. Engineers build component libraries, but only engineers can use them effectively.

### Ship UI changes without deployments

Most apps ship with a hard-coded UI. Even small tweaks require a full redeploy. With Composify, your UI lives on the server. Change it there, and it's live everywhere, instantly. No CI/CD, no app store reviews, no waiting.

Big tech does this already. Airbnb has [Ghost Platform](https://medium.com/airbnb-engineering/a-deep-dive-into-airbnbs-server-driven-ui-system-842244c5f5). Yelp built [CHAOS](https://engineeringblog.yelp.com/2024/03/chaos-yelps-unified-framework-for-server-driven-ui.html). Lyft and Shopify have their own SDUI systems. Composify gives you that same power without the in-house infrastructure.

### Unblock your team

In most companies, small UI tweaks end up in the engineering backlog. Marketing wants to launch a promo. Content editors want to tweak a landing page. The ops team is running a seasonal campaign.

With Composify, the roles become clear:

- Engineers focus on what they do best: building robust, reusable components
- Non-developers use the visual editor to bring those components to life

### A/B testing and rapid prototyping

Want to test a different page layout for a user segment? Or prototype a feature directly in production? Swap out page structures, personalize onboarding flows, test new CTAs. It all happens server-side. No redeploys. No branching strategies.

### Better than headless CMS

Traditional CMSs lock you into themes and templates. You end up rebuilding your design system inside a clunky page builder, and the result never quite matches your actual app.

With Composify, content teams use the same components that power your core product. What they edit is exactly what ships.

More details on use cases in the [documentation](https://composify.js.org/docs/use-cases/instant-ui-updates).

## Composify Cloud

The open-source library gives you the engine (Editor and Renderer). Building the car (database, API, version history, collaboration) takes time.

[Composify Cloud](https://composify.js.org/cloud) is the infrastructure layer for teams that want the benefits without maintaining the backend:

- **Managed hosting** - No infrastructure to manage, unlimited bandwidth
- **Real-time collaboration** - Multiple team members can edit the same page simultaneously
- **Version history** - Time-travel through changes and restore previous versions

## Documentation

Full documentation is available at [composify.js.org/docs](https://composify.js.org/docs).

## Contributing

We welcome contributions. Whether you're fixing bugs, adding features, or improving docs, pull requests and issues are always welcome.

## License

This project is licensed under the [Elastic License 2.0](LICENSE). Free to use for most cases, with some restrictions on offering Composify as a hosted service. See the license file for details.
