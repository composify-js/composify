# Composify Cloud Tutorial

This guide will help you integrate the Composify Cloud editor and renderer into your existing project.

## Install Composify

Add Composify to your project with your preferred package manager:

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

## Register your components

You _can_ use plain HTML elements, but Composify really shines when you use your own components.

To make them available inside Composify, register them as described in the [component registration guide](/docs/catalog#registering-a-component).

:::note[Tip]
Keep your `Catalog.register(...)` calls in a central file that imports all your component registrations. This way, you only need to import one file in your app.
:::

For example, see our [components index file](https://github.com/composify-js/composify/blob/main/examples/nextjs/components/index.ts) and how it's imported in the [page component](https://github.com/composify-js/composify/blob/main/examples/nextjs/app/%5Bslug%5D/page.tsx#L1).

## Render a page

With our components registered, let's render a page. The `Renderer` takes the saved JSX and renders it using your components.

:::code-group
```jsx showLineNumbers [Next.js]
/* app/pages/[slug]/page.tsx */
import '@/components';

import { Renderer } from '@composify/react/renderer';
import { notFound } from 'next/navigation';

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const url = `https://pages.composify.net/[org public id]/${slug}`;
  const res = await fetch(url, {
    cache: 'no-store',
  });

  const { content } = await res.json().catch(() => ({}));

  if (!content) {
    return notFound();
  }

  return (
    <Renderer source={content} />
  );
}
```

```tsx showLineNumbers [React Router]
/* app/routes/pages/page.tsx */
import '~/components';

import { Renderer } from '@composify/react/renderer';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';

  const url = `https://pages.composify.net/[org public id]/${slug}`;
  const res = await fetch(url, {
    cache: 'no-store',
  });

  const { content } = await res.json().catch(() => ({}));

  if (!content) {
    throw new Response('', { status: 404 });
  }

  return { slug, content };
}

export default function Page() {
  const { slug, content } = useLoaderData<typeof loader>();

  return (
    <Renderer source={content} />
  );
}
```
:::

## Set up the Editor

Now for the fun part: setting up the visual editor. Use the `CloudEditor` component to create or update content directly in Composify Cloud.

:::code-group
```jsx showLineNumbers [Next.js]
/* app/pages/composify-editor.tsx */
'use client';

import '@composify/react/style.css';
import '@/components';

import { CloudEditor } from '@composify/react/editor';

export default function Page() {
  return <CloudEditor />;
}
```

```jsx showLineNumbers [React Router]
/* app/routes/composify-editor.tsx */
import '@composify/react/style.css';
import '~/components';

import { CloudEditor } from '@composify/react/editor';

export default function Page() {
  return <CloudEditor />;
}
```
:::

## Wrap up

That's it! 🎉

1. Go to your organization settings in Composify Cloud.
2. Enter the editor URL you just set up.
3. Start editing visually, and watch your changes sync into your app.
