# Next.js Tutorial

In this guide, we'll assume you already have a Next.js project up and running. If not, start with the [Next.js getting started guide](https://nextjs.org/docs/app/getting-started/) first.

Make sure your mock API from the [prerequisites](/docs/tutorial/prerequisites) is running on `http://localhost:9000`. We'll use it to read and write documents. We'll identify pages with a simple `slug` (like `foo`) — no slashes needed.

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
Right now Composify works with React only. Vue support is in the works and coming soon.
:::

## Register components to the Catalog

You _can_ use plain HTML elements, but Composify really shines with your own components. Let's create three simple components: `Heading`, `Body`, and `Button`.

:::code-group
```jsx showLineNumbers [Heading]
/* components/Heading.tsx */
import { createElement, type FC, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  level?: 1 | 2 | 3;
  weight?: 'semibold' | 'bold' | 'extrabold';
}>;

const TEXT_SIZE = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
};

const FONT_WEIGHT = {
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

export const Heading: FC<Props> = ({
  level = 1,
  weight = 'extrabold',
  children,
}) =>
  createElement(
    `h${level}`,
    { className: `text-neutral-900 ${FONT_WEIGHT[weight]} ${TEXT_SIZE[level]}` },
    children
  );
```

```jsx showLineNumbers [Body]
/* components/Body.tsx */
import { type FC, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  color?: string;
  weight?: 'light' | 'normal';
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}>;

const FONT_WEIGHT = {
  light: 'font-light',
  normal: 'font-normal',
};

export const Body: FC<Props> = ({
  color = '#1E1E1E',
  weight = 'normal',
  margin,
  children,
}) => (
  <p
    className={`text-xl ${FONT_WEIGHT[weight]}`}
    style={{
      color,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
    }}
  >
    {children}
  </p>
);
```

```jsx showLineNumbers [Button]
/* components/Button.tsx */
import { type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  variant: 'primary' | 'outline';
}>;

export const Button = ({ variant, children }: Props) => {
  const className =
    variant === 'primary'
      ? 'bg-blue-500 border-blue-500 text-neutral-100'
      : 'border border-neutral-200 text-neutral-900';

  return <button className={`px-5 py-3 text-base rounded ${className}`}>{children}</button>;
};
```
:::

Now register them:

:::code-group
```jsx showLineNumbers [Heading]
/* components/Heading.tsx */
import { Catalog } from '@composify/react/renderer';

/* ... */

Catalog.register('Heading', {
  component: Heading,
  props: {
    level: {
      label: 'Heading Level',
      type: 'radio',
      options: [
        {
          label: '1',
          value: 1,
        },
        {
          label: '2',
          value: 2,
        },
        {
          label: '3',
          value: 3,
        },
      ],
      default: 1,
    },
    weight: {
      label: 'Font Weight',
      type: 'select',
      options: [
        {
          label: 'Semibold',
          value: 'semibold',
        },
        {
          label: 'Bold',
          value: 'bold',
        },
        {
          label: 'Extrabold',
          value: 'extrabold',
        },
      ],
      default: 'extrabold',
    },
    children: {
      label: 'Content',
      type: 'text',
      default: 'Server Driven UI made easy',
    },
  },
});
```

```jsx showLineNumbers [Body]
/* components/Body.tsx */
import { Catalog } from '@composify/react/renderer';

/* ... */

Catalog.register('Body', {
  component: Body,
  props: {
    children: {
      label: 'Content',
      type: 'text',
    },
    color: {
      label: 'Text Color',
      type: 'text',
      default: '#1E1E1E',
    },
    weight: {
      label: 'Font Weight',
      type: 'radio',
      options: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Normal',
          value: 'normal',
        },
      ],
      default: 'normal',
    },
    margin: {
      label: 'Margin',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
        left: {
          label: 'Left',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
          type: 'number',
          default: 0,
        },
      },
    },
  },
});
```

```jsx showLineNumbers [Button]
/* components/Button.tsx */
import { Catalog } from '@composify/react/renderer';

/* ... */

Catalog.register('Button', {
  component: Button,
  props: {
    variant: {
      label: 'Variant',
      type: 'radio',
      options: [
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Outline',
          value: 'outline',
        },
      ],
      default: 'primary',
    },
    children: {
      label: 'Content',
      type: 'text',
      default: 'Learn More',
    },
  },
});
```
:::

Finally, export them in `components/index.ts` so you can import them all at once:

```jsx showLineNumbers [components/index.ts]
export { Heading } from './Heading';
export { Body } from './Body';
export { Button } from './Button';
```

## Render a page

The `Renderer` takes the saved JSX and renders it using your registered components.

```jsx showLineNumbers [app/[slug]/page.tsx]
import '@composify/react/preset';
import '@/components';

import { Renderer } from '@composify/react/renderer';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`http://localhost:9000/documents/${slug}`, {
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

Now test it:

- Visit [`http://localhost:3000/foo/`](http://localhost:3000/foo/) to see the saved page.
- Visit [`http://localhost:3000/baz/`](http://localhost:3000/baz/) and you'll get a 404 because there's no data yet.

## Set up the Editor

To create or update content, we'll set up the `Editor` component. Since it contains client-side interactivity, mark the file with `'use client'`.

```jsx showLineNumbers [app/editor/[slug]/client.tsx]
'use client';

import '@composify/react/preset';
import '@composify/react/style.css';
import '@/components';

import { Editor } from '@composify/react/editor';

export default function EditorPage({ slug, content }: { slug: string; content: string }) {
  return <Editor title={slug} source={content} />;
}
```

**Notes:**

- `@composify/react/preset` is optional; it just gives you handy layout components like `VStack`.
- `@composify/react/style.css` is **required** — it contains core editor styles.
- Import your components so they're available in the editor.

### Load the initial source

We'll fetch the saved JSX from our GET API and pass it to the `Editor` as the source prop.

```jsx showLineNumbers [app/editor/[slug]/page.tsx]
import EditorPage from './client';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`http://localhost:9000/documents/${slug}`, {
    cache: 'no-store',
  });
  const { content } = await res.json().catch(() => ({}));

  return <EditorPage slug={slug} content={content ?? '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />'} />;
}
```

Open [`http://localhost:3000/editor/foo/`](http://localhost:3000/editor/foo/) and you should see the editor UI with the document loaded.

### Handle saving

Right now, clicking **Save** does nothing. Let's wire up an `onSubmit` handler so the editor knows how to store the updated content.

```jsx showLineNumbers [app/editor/[slug]/client.tsx]
'use client';

import '@composify/react/preset';
import '@composify/react/style.css';
import '@/components';

import { Editor } from '@composify/react/editor';
import { useRouter } from 'next/navigation';

export default function EditorPage({ slug, content }: { slug: string; content: string }) {
  const router = useRouter();

  const handleSubmit = async (source: string) => {
    await fetch(`http://localhost:9000/documents/${slug}`, {
      method: 'DELETE',
    }).catch(() => null);

    await fetch('http://localhost:9000/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: slug,
        content: source,
      }),
    });

    if (!window.confirm('Saved successfully. Keep editing?')) {
      router.push(slug);
    }
  };

  return <Editor title={slug} source={content} onSubmit={handleSubmit} />;
}
```

Now, when you hit **Save**, the editor sends the updated JSX to your `/documents` API.
If you select **No** in the confirmation dialog, you'll be redirected to the rendered page.

## Try it out

1. Visit [`http://localhost:3000/foo/`](http://localhost:3000/foo/) to see the saved content.
2. Open [`http://localhost:3000/editor/foo/`](http://localhost:3000/editor/foo/), make a change, and click **Save** — the rendered page updates instantly.
3. Visit [`http://localhost:3000/baz/`](http://localhost:3000/baz/) to see a 404.
4. Open [`http://localhost:3000/editor/baz/`](http://localhost:3000/editor/baz/), creat content, click **Save**, and the new page will be live immediately 🎉

## Wrapping up

You now have:

- A **document store** (currently powered by json-server, but could be a real database later)
- An **editor** where you can visually compose pages using your own components
- A **renderer** that turns saved JSX back into real UI

From here, you could:

- Replace json-server with a real database
- Add authentication and user permissions
- Deploy it so your whole team can collaborate

For unlimited bandwidth, built-in version history, and collaboration features, try [Composify Cloud](https://composify.com) — or self-host it, since it's all open source.
