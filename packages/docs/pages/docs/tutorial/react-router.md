# React Router Tutorial

This guide will walk you through setting up Composify in your React Router project. We'll assume you already have a React Router project up and running. If not, start with the [React Router quick start guide](https://v5.reactrouter.com/web/guides/quick-start/) first.

First, make sure the mock API from our [prerequisites guide](/docs/tutorial/prerequisites) is running on `http://localhost:9000`. We'll use it to read and write our page content.

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

You _can_ use plain HTML elements, but Composify really shines when you use your own components. Let's create a few simple ones.

:::code-group
```jsx showLineNumbers [Heading]
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

```jsx showLineNumbers [Body]
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

```jsx showLineNumbers [Button]
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

```jsx showLineNumbers [VStack]
import { type FC, type PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
  alignVertical?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  size?: {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  backgroundColor?: string;
  gap?: number;
}>;

export const VStack: FC<Props> = ({
  alignVertical,
  alignHorizontal,
  size,
  padding,
  margin,
  gap,
  backgroundColor,
  children,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: alignHorizontal,
      justifyContent: alignVertical,
      width: size?.width,
      minWidth: size?.minWidth,
      maxWidth: size?.maxWidth,
      height: size?.height,
      minHeight: size?.minHeight,
      maxHeight: size?.maxHeight,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      gap,
      backgroundColor,
    }}
  >
    {children}
  </div>
);
```

```jsx showLineNumbers [HStack]
import { type FC, type PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignVertical?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  size?: {
    width?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: number | string;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  backgroundColor?: string;
  gap?: number;
}>;

export const HStack: FC<Props> = ({
  alignVertical,
  alignHorizontal,
  size,
  padding,
  margin,
  gap,
  backgroundColor,
  children,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: alignVertical,
      justifyContent: alignHorizontal,
      width: size?.width,
      minWidth: size?.minWidth,
      maxWidth: size?.maxWidth,
      height: size?.height,
      minHeight: size?.minHeight,
      maxHeight: size?.maxHeight,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      gap,
      backgroundColor,
    }}
  >
    {children}
  </div>
);
```
:::

Now, let's register them in the Catalog:

:::code-group
```jsx showLineNumbers [Heading]
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

```jsx showLineNumbers [Body]
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

```jsx showLineNumbers [Button]
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

```jsx showLineNumbers [VStack]
/* app/components/VStack.tsx */
import { Catalog } from '@composify/react/renderer';

/* ... */
Catalog.register('VStack', {
  component: VStack,
  props: {
    alignHorizontal: {
      label: 'Horizontal Alignment',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Stretch', value: 'stretch' },
      ],
      default: 'stretch',
      optional: true,
    },
    alignVertical: {
      label: 'Vertical Alignment',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
        { label: 'Space Evenly', value: 'space-evenly' },
      ],
      default: 'flex-start',
      optional: true,
    },
    gap: {
      label: 'Gap',
      type: 'number',
      default: 0,
      optional: true,
    },
    size: {
      label: 'Size',
      type: 'object',
      fields: {
        width: {
          label: 'Width',
          type: 'number',
          default: 100,
          optional: true,
        },
        minWidth: {
          label: 'Min Width',
          type: 'number',
          optional: true,
        },
        maxWidth: {
          label: 'Max Width',
          type: 'number',
          optional: true,
        },
        height: {
          label: 'Height',
          type: 'number',
          default: 100,
          optional: true,
        },
        minHeight: {
          label: 'Min Height',
          type: 'number',
          optional: true,
        },
        maxHeight: {
          label: 'Max Height',
          type: 'number',
          optional: true,
        },
      },
      default: {
        height: 100,
      },
    },
    padding: {
      label: 'Padding',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
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
      },
      optional: true,
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
        right: {
          label: 'Right',
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
      },
      optional: true,
    },
    backgroundColor: {
      label: 'Background Color',
      type: 'text',
      default: '#ffffff',
      optional: true,
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});
```

```jsx showLineNumbers [HStack]
/* app/components/HStack.tsx */
import { Catalog } from '@composify/react/renderer';

/* ... */
Catalog.register('HStack', {
  component: HStack,
  props: {
    alignHorizontal: {
      label: 'Horizontal Alignment',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
        { label: 'Space Evenly', value: 'space-evenly' },
      ],
      default: 'flex-start',
      optional: true,
    },
    alignVertical: {
      label: 'Vertical Alignment',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Stretch', value: 'stretch' },
      ],
      default: 'stretch',
      optional: true,
    },
    gap: {
      label: 'Gap',
      type: 'number',
      default: 0,
      optional: true,
    },
    size: {
      label: 'Size',
      type: 'object',
      fields: {
        width: {
          label: 'Width',
          type: 'number',
          default: 100,
          optional: true,
        },
        minWidth: {
          label: 'Min Width',
          type: 'number',
          optional: true,
        },
        maxWidth: {
          label: 'Max Width',
          type: 'number',
          optional: true,
        },
        height: {
          label: 'Height',
          type: 'number',
          default: 100,
          optional: true,
        },
        minHeight: {
          label: 'Min Height',
          type: 'number',
          optional: true,
        },
        maxHeight: {
          label: 'Max Height',
          type: 'number',
          optional: true,
        },
      },
      default: {
        height: 100,
      },
    },
    padding: {
      label: 'Padding',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
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
      },
      optional: true,
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
        right: {
          label: 'Right',
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
      },
      optional: true,
    },
    backgroundColor: {
      label: 'Background Color',
      type: 'text',
      default: '#ffffff',
      optional: true,
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});
```
:::

Finally, create a central export file at `app/components/index.ts` so we can import them all with a single line:

```ts [app/components/index.ts]
export { Heading } from './Heading';
export { Body } from './Body';
export { Button } from './Button';
export { HStack } from './HStack';
export { VStack } from './VStack';
```

## Render a page

With our components registered, let's render a page. The `Renderer` takes the saved JSX and renders it using your components.

```tsx [app/routes/page.tsx]
import '~/components';

import { Renderer } from '@composify/react/renderer';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';
  const res = await fetch(`http://localhost:9000/documents/${slug}`);
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

Also register the route in `app/routes.ts`:

```ts [app/routes.ts]
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route(':slug', 'routes/page.tsx'),
] satisfies RouteConfig;
```

Now you can test it:

- Visit [`http://localhost:3000/foo/`](http://localhost:3000/foo/) to see the saved page.
- Visit [`http://localhost:3000/baz/`](http://localhost:3000/baz/) and you'll get a 404 because there's no data yet.

## Set up the Editor

Now for the fun part: setting up the visual editor. To create or update content, we'll use the `Editor` component.

```jsx showLineNumbers [app/routes/editor.tsx]
import '@composify/react/style.css';
import '~/components';

import { Editor } from '@composify/react/editor';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';
  const res = await fetch(`http://localhost:9000/documents/${slug}`);
  const { content } = await res.json().catch(() => ({}));

  return {
    slug,
    content: content ?? '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />',
  };
}

export default function EditorPage() {
  const { slug, content } = useLoaderData<typeof loader>();

  return <Editor title={slug} source={content} />;
}
```

Don't forget to register the route in `app/routes.ts`:

```ts [app/routes.ts]
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route(':slug', 'routes/page.tsx'),
  route('editor/:slug', 'routes/editor.tsx'),
] satisfies RouteConfig;
```

A few key points:

- `@composify/react/style.css` is **required** — it contains the core editor styles.
- Import your components (`~/components`) so they're available in the editor.

Open [`http://localhost:3000/editor/foo/`](http://localhost:3000/editor/foo/) and you should see the editor UI with the document loaded.

### Handle saving

Right now, clicking **Save** does nothing. Let's wire it up to our API using the `onSubmit` handler.

```jsx showLineNumbers [app/routes/editor.tsx]
import '@composify/react/style.css';
import '~/components';

import { Editor } from '@composify/react/editor';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData, useNavigate } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';
  const res = await fetch(`http://localhost:9000/documents/${slug}`);
  const { content } = await res.json().catch(() => ({}));

  return {
    slug,
    content: content ?? '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />',
  };
}

export default function EditorPage() {
  const { slug, content } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleSubmit = async (source: string) => {
    await fetch(`http://localhost:9000/documents/${slug}`, {
      method: 'DELETE',
    }).catch(() => null);

    await fetch('http://localhost:9000/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: slug,
        content: source,
      }),
    });

    if (!window.confirm('Saved successfully. Keep editing?')) {
      navigate(`/${slug}`);
    }
  };

  return <Editor title={slug} source={content} onSubmit={handleSubmit} />;
}
```

Now, when you hit **Save**, the editor sends the updated JSX to your `/documents` API.
If you select **No** in the confirmation dialog, you'll be redirected to the rendered page.

## Try it out!

1. Visit [`http://localhost:3000/foo/`](http://localhost:3000/foo/) to see the saved content.
2. Open [`http://localhost:3000/editor/foo/`](http://localhost:3000/editor/foo/), make a change, and click **Save** — the rendered page updates instantly.
3. Visit [`http://localhost:3000/baz/`](http://localhost:3000/baz/) to see a 404.
4. Open [`http://localhost:3000/editor/baz/`](http://localhost:3000/editor/baz/), creat content, click **Save**, and the new page will be live immediately 🎉

## Wrapping up

And that's it! You now have:

- A **document store** (currently powered by json-server, but could be a real database later)
- An **editor** where you can visually compose pages using your own components
- A **renderer** that turns saved JSX back into real UI

Where to go from here?

- Replace json-server with a real database
- Add authentication and user permissions
- Deploy it so your whole team can collaborate

For unlimited bandwidth, built-in version history, and collaboration features, try [Composify Cloud](/cloud) — or self-host it, since it's all open source.
