---
layout: docs
date: 2025-10-26
---

# Introducing Composify

::authors

A few years back, we were shipping campaign pages every week. Same story most startups deal with: new promotion launches, seasonal events, A/B tests. Each time, we'd copy-paste similar layouts, tweak components, adjust styles manually. It worked, but it didn't scale.

We realized we were basically playing with building blocks made from our own components. The patterns were there. We just needed a better way to compose them without writing the same boilerplate over and over.

After looking around, we found a few visual editors, but they all had the same problem: they either locked us into their ecosystem, required massive rewrites to integrate, or didn't play well with our existing component library. So we built our own.

Fast-forward two years, and that internal tool ended up powering 60% of our incoming traffic. Marketing ran every campaign through it. Product used it for experiments. The design team prototyped features in production without waiting on engineering.

After moving on to other companies, I kept seeing the same pattern: teams needed visual editing but didn't want to rebuild their entire stack around a proprietary CMS or page builder. If you've tried [Plasmic](https://www.plasmic.app/), [Builder.io](https://www.builder.io/), or [Puck](https://puckeditor.com/), you know what I mean. Powerful tools, but they come with trade-offs.

That's why we're releasing Composify.

## What is Composify?

Composify is an open-source toolkit that lets you build and edit pages visually using your own production components. No new DSLs, no proprietary formats.

Here's how it works:

1. **Register your components** — Define what's editable (props, types, defaults) in a simple catalog.
2. **Render JSX directly** — The renderer parses a JSX string and renders it exactly like React would. No custom syntax, no magic.
3. **Edit visually** — Drag, drop, and configure components in a visual editor. Non-developers can build pages without touching code.

What makes it different? It just drops in. No rewrites, no migration plans. We've used it in production at a $300M-valuation company, handling real traffic in a brownfield environment full of legacy systems, deadlines, and all the usual chaos. It held up. You can start building with it today.

## Why not use existing tools?

There are great visual builders out there. But most of them come with one or more of these issues:

- **Vendor lock-in** — You end up tightly coupled to their platform, APIs, and deployment model.
- **Component drift** — Your "design system" becomes a separate thing maintained inside the tool, drifting from your actual production code.
- **Complex integration** — Retrofitting them into an existing codebase often means rewriting components or adapting to their framework.
- **Black-box rendering** — You don't always know what's happening under the hood. Debugging and customization get harder.

Composify takes a different approach:

- **Zero lock-in** — It's just a React library. Bring your own backend, or use our optional cloud service.
- **No drift** — The editor uses your actual production components. If it's not in your catalog, it can't be used.
- **Drop-in integration** — Register components, import the renderer or editor, and you're done. It fits your codebase, not the other way around.
- **Transparent** — It's open source. You can read every line.

## What can you do with it?

Composify does a lot more than just marketing pages. Here are some real use cases:

### 1. Server-Driven UI

Most apps ship with hard-coded UIs. Every tweak requires a redeploy, CI/CD pipeline, maybe even an app store review. With Composify, your UI lives on the server. Change it there, and it updates everywhere instantly. No code push, no waiting.

Big tech companies like Airbnb ([Ghost Platform](https://medium.com/airbnb-engineering/a-deep-dive-into-airbnbs-server-driven-ui-system-842244c5f5)), Yelp ([CHAOS](https://engineeringblog.yelp.com/2024/03/chaos-yelps-unified-framework-for-server-driven-ui.html)), Lyft, and Shopify already do this with internal SDUI systems. Composify gives you that power without building it from scratch.

### 2. Let non-technical teams ship

Not every UI change needs to be a product feature. Marketing wants to launch a promo. Content editors want to tweak a landing page. The ops team is running a seasonal campaign.

With Composify, they can visually build pages from your pre-defined components without waiting on developers. You define the building blocks. They compose the layouts. Everyone ships faster.

### 3. A/B testing and rapid prototyping

Want to test an entirely different page layout for a user segment? Or prototype a feature directly in production before committing to it? Composify makes it trivial.

Swap out page structures, personalize onboarding flows, test new CTAs. It all happens server-side, gated by feature flags or experiment groups. No redeploys. No branching strategies. Just compose, test, and iterate.

### 4. Replace your headless CMS (kind of)

Traditional CMSs like WordPress lock you into themes and templates. You end up rebuilding your design system inside a clunky page builder, and the result never quite matches your actual app.

With Composify, content teams use the same components that power your core product. What they edit is exactly what ships. No theme drift. No disconnect between CMS and production.

## How do you get started?

Here's the simplest path:

Install it:

```bash
npm install @composify/react
```

Register a component:

```jsx
import { Catalog } from '@composify/react/renderer';

const Text = ({ textAlign, children }) => (
  <p style={{ textAlign }}>{children}</p>
);

Catalog.register('Text', {
  component: Text,
  props: {
    textAlign: {
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      default: 'left',
    },
    children: {
      type: 'string',
      default: 'Hello, world!',
    },
  },
});
```

Render it:

```jsx
import { Renderer } from '@composify/react/renderer';

const source = `<Text textAlign="center">Hello, world!</Text>`;

export const Page = () => <Renderer source={source} />;
```

Edit it:

```jsx
import '@composify/react/style.css';
import { Editor } from '@composify/react/editor';

export const EditorPage = () => (
  <Editor source={source} onSubmit={console.log} />
);
```

That's it. For full tutorials and docs, visit [composify.js.org](https://composify.js.org).

## Composify Cloud

We're also launching [Composify Cloud](https://composify.cloud) for teams that want instant collaboration, version history, and unlimited bandwidth without managing infrastructure.

Same editor experience, less setup, more team-friendly features. Think of it like GitHub for visual page editing.

## Where we're going

Right now, Composify works with React. Vue support is coming soon. We're also exploring deeper integrations with design tools, better AI assistance for content generation, and more advanced SDUI patterns.

But the core philosophy won't change: **lightweight, transparent, and built to work with your code, not replace it.**

## Try it out

- **Docs**: [https://composify.js.org](https://composify.js.org)
- **Demo**: [https://composify.js.org/demo](https://composify.js.org/demo)
- **GitHub**: [https://github.com/composify-js/composify](https://github.com/composify-js/composify)
- **Cloud**: [https://composify.js.org/cloud](https://composify.js.org/cloud)

Composify is still young, but we're building it in the open. If you believe in Server-Driven UI and want full control over your stack, we'd love to have you join us.
