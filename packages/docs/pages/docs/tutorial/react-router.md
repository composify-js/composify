# React Router Tutorial

This guide shows how to integrate Composify into a React Router project with basic file-system APIs. It assumes you already have a React Router project created with `react-router init`.

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

## Build document APIs

Before Composify can do anything useful, it needs a way to save and load page documents. We'll create one route module that handles both `GET` and `POST` requests, storing everything in a `database.json` file at the project root.

```ts [app/routes/api.documents.ts]
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import fs from 'fs';

export async function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug') ?? '';
  const database = JSON.parse(fs.existsSync('database.json') ? fs.readFileSync('database.json', 'utf-8') : '{}');

  return new Response(database[slug], { status: 200 });
}

export async function action({ request }: ActionFunctionArgs) {
  const { slug, content } = await request.json();

  const database = JSON.parse(fs.existsSync('database.json') ? fs.readFileSync('database.json', 'utf-8') : '{}');

  const updatedData = {
    ...database,
    [decodeURIComponent(slug)]: content,
  };

  fs.writeFileSync('database.json', JSON.stringify(updatedData));

  return new Response('', { status: 200 });
}
```

Don't forget to register the route in `app/routes.ts`:

```ts [app/routes.ts]
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('api/documents', 'routes/api.documents.ts'),
] satisfies RouteConfig;
```

Test it:

```bash
curl -X POST http://localhost:5173/api/documents \
  --data '{"slug":"/test","content":"<VStack size={{ height: 100 }} backgroundColor=\"#f8fafc\" />"}'
```

Then:

```bash
curl "http://localhost:5173/api/documents?slug=/test"
# <VStack size={{height: 100}} backgroundColor="#f8fafc" />
```

## Add your components to the Catalog

You _can_ use plain HTML elements, but Composify really shines with your own components. Let's create three simple components: `Heading`, `Body`, and `Button`.

:::code-group
```jsx [Heading]
/* app/components/Heading.tsx */
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

```jsx [Body]
/* app/components/Body.tsx */
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

```jsx [Button]
/* app/components/Button.tsx */
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
```jsx [Heading]
/* app/components/Heading.tsx */
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

```jsx [Body]
/* app/components/Body.tsx */
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

```jsx [Button]
/* app/components/Button.tsx */
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

Finally, export them in `app/components/index.ts` so you can import them all at once:

```ts [app/components/index.ts]
export { Heading } from './Heading/Heading';
export { Body } from './Body/Body';
export { Button } from './Button/Button';
```

## Set up the Editor

We'll load the initial source in a route loader and pass it to the Composify's editor component.

```jsx [app/routes/editor.tsx]
import '@composify/react/preset';
import '@composify/react/style.css';
import '~/components';

import { Editor } from '@composify/react/editor';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData, useNavigate } from 'react-router';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const slug = '/' + (params['*'] ?? '');
  const url = new URL(request.url);

  const res = await fetch(new URL(`/api/documents?slug=${encodeURIComponent(slug)}`, url.origin));
  const source = await res.text();

  return {
    slug,
    source: source || '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />',
  };
}

export default function EditorPage() {
  const { slug, source } = useLoaderData<typeof loader>();

  return <Editor title={slug} source={source} />;
}
```

Don't forget to register the route in `app/routes.ts`:

```ts [app/routes.ts]
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('api/documents', 'routes/api.documents.ts'),
  route('editor/*', 'routes/editor.tsx'),
] satisfies RouteConfig;
```

**Notes:**

- `@composify/react/style.css` is **required** — it contains core editor styles.
- Import your components so they're available in the editor.
- `@composify/react/preset` is optional; it just gives you handy layout components like `VStack`.


### Try it out in the browser

Now open [`http://localhost:5173/editor/test/`](http://localhost:5173/editor/test/) in your browser. You should see Composify's editor UI with the initial document loaded.

When you click Save right now, nothing will happen yet. That's because we haven't told the editor what to do on submit. Let's fix that by wiring up the save handler in our `editor.tsx` file.

```jsx [app/routes/editor.tsx]
import '@composify/react/preset';
import '@composify/react/style.css';
import '~/components';

import { Editor } from '@composify/react/editor';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData, useNavigate } from 'react-router';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const slug = '/' + (params['*'] ?? '');
  const url = new URL(request.url);

  const res = await fetch(new URL(`/api/documents?slug=${encodeURIComponent(slug)}`, url.origin));
  const source = await res.text();

  return {
    slug,
    source: source || '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />',
  };
}

export default function EditorPage() {
  const { slug, source } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleSubmit = async (src: string) => {
    await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, content: src }),
    });

    if (!window.confirm('Saved successfully. Keep editing?')) {
      navigate(slug);
    }
  };

  return <Editor title={slug} source={source} onSubmit={handleSubmit} />;
}
```

Now, when you hit Save, the document will POST to our `/api/documents` endpoint, and you'll get a confirmation prompt.

If you choose No, you'll be taken straight to the rendered page.

## Add the Renderer

The renderer simply pulls the saved JSX and renders it using your registered components.

```tsx [app/routes/page.tsx]
import '@composify/react/preset';
import '~/components';

import { Renderer } from '@composify/react/renderer';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const slug = '/' + (params['*'] ?? '');
  const url = new URL(request.url);
  const res = await fetch(new URL(`/api/documents?slug=${encodeURIComponent(slug)}`, url.origin));
  const source = await res.text();

  if (!source) {
    throw new Response('', { status: 404 });
  }

  return { slug, source };
}

export default function Page() {
  const { slug, source } = useLoaderData<typeof loader>();

  return (
    <main className="p-4">
      <section className="flex items-end justify-between mb-4">
        <h1 className="text-2xl">Rendering page {slug}</h1>
        <a href={`/editor${slug}`} className="text-blue-500 hover:underline">
          Visit Editor
        </a>
      </section>
      <section className="border rounded-sm border-neutral-200">
        <Renderer source={source} />
      </section>
    </main>
  );
}
```

Also register the route in `app/routes.ts`:

```ts [app/routes.ts]
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('api/documents', 'routes/api.documents.ts'),
  route('editor/*', 'routes/editor.tsx'),
  route('*', 'routes/page.tsx'),
] satisfies RouteConfig;
```

Now try it:

- Visit [`http://localhost:5173/test/`](http://localhost:5173/test/) — you'll see the saved design.
- Visit [`http://localhost:5173/foo/`](http://localhost:5173/foo/) — 404 (since there's no data yet).
- Open [`http://localhost:5173/editor/foo/`](http://localhost:5173/editor/foo/), edit something, click **Save** — and [`http://localhost:5173/foo/`](http://localhost:5173/foo/) will be live instantly 🎉

## Wrapping up

You now have:

- A **document store** (file-based for now, but could be a DB later)
- An **editor** where you can visually compose pages using your own components
- A **renderer** that turns saved JSX back into real UI

From here, you could:

- Swap `database.json` for a real database
- Add auth and user permissions
- Deploy it so your whole team can collaborate

For unlimited bandwidth, built-in version history, and collaboration features, try [Composify Cloud](https://composify.com) — or self-host it, since it's all open source.
