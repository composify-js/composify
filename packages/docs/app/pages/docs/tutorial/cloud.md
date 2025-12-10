# Composify Cloud

This guide walks you through integrating Composify Cloud into your project. Unlike the other tutorials, you don't need to set up your own backend. Composify Cloud handles storage, version history, and collaboration for you.

## 1. Install Composify

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

:::info[Vue support is on the way]
Right now, Composify works with React only. Vue support is in the works and will be coming soon.
:::

## 2. Register Your Components

You _can_ use plain HTML elements, but Composify works best with your own components. Register them using the [Catalog API](https://composify.js.org/docs/catalog#registering-a-component).

:::note[Tip]
Keep your `Catalog.register(...)` calls in a central file that imports all your component registrations. This way, you only need to import one file in your app.
:::

If you haven't set up components yet, check out the framework-specific tutorials for detailed examples:

- [Next.js Tutorial](/docs/tutorial/nextjs)
- [React Router Tutorial](/docs/tutorial/react-router)
- [Expo Tutorial](/docs/tutorial/expo)

## 3. Render Pages

With your components registered, use the `Renderer` to display content fetched from Composify Cloud.

:::code-group
```tsx [Next.js]
/* app/[slug]/page.tsx */
import '@/components/catalog';

import { Renderer } from '@composify/react/renderer';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`https://pages.composify.cloud/[your-org-id]/${slug}`, {
    cache: 'no-store',
  });
  const { content } = await res.json().catch(() => ({}));

  if (!content) {
    return notFound();
  }

  return <Renderer source={content} />;
}
```

```tsx [React Router]
/* app/routes/page.tsx */
import '~/components/catalog';

import { Renderer } from '@composify/react/renderer';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';

  const res = await fetch(`https://pages.composify.cloud/[your-org-id]/${slug}`);
  const { content } = await res.json().catch(() => ({}));

  if (!content) {
    throw new Response('', { status: 404 });
  }

  return { slug, content };
}

export default function Page() {
  const { content } = useLoaderData<typeof loader>();

  return <Renderer source={content} />;
}
```
:::

Replace `[your-org-id]` with your organization's public ID from Composify Cloud.

## 4. Set Up the Editor

Now for the fun part: setting up the visual editor. Use the `CloudEditor` component to create and edit content directly in Composify Cloud.

:::code-group
```tsx [Next.js]
/* app/composify-editor/page.tsx */
'use client';

import '@/components/catalog';
import '@composify/react/style.css';

import { CloudEditor } from '@composify/react/editor';

export default function EditorPage() {
  return <CloudEditor />;
}
```

```tsx [React Router]
/* app/routes/composify-editor.tsx */
import '~/components/catalog';
import '@composify/react/style.css';

import { CloudEditor } from '@composify/react/editor';

export default function EditorPage() {
  return <CloudEditor />;
}
```
:::

A couple things to note:

- `@composify/react/style.css` is **required**. It contains the editor's core styles.
- The catalog import ensures your components are available in the editor.

## 5. Connect to Composify Cloud

1. Go to your organization settings in [Composify Cloud](https://composify.cloud).
2. Enter the editor URL you just set up (e.g., `https://your-app.com/composify-editor`).
3. Start editing visually, and watch your changes sync into your app.

## Wrapping Up

That's it! You now have:

- A **renderer** that fetches and displays content from Composify Cloud
- A **visual editor** connected to Composify Cloud for real-time editing
- **No backend to maintain**: storage, versioning, and collaboration are handled for you
