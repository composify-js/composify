# React Router Tutorial

This guide walks you through integrating Composify into a React Router project. We assume you already have a React Router project set up. If not, follow the [React Router getting started guide](https://reactrouter.com/start/framework/installation) first.

Before we begin, make sure your mock API is running on port 9000. (See [Prerequisites](/docs/tutorial/prerequisites) for setup instructions.) We'll use this API to store and retrieve page content.

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

:::info[Vue support is on the way 🚀]
Right now, Composify works with React only. Vue support is in the works and will be coming soon.
:::

## 2. Your Existing Components

You _can_ use plain HTML elements, but Composify works best with your own components. Let's say you have these components in your project:

:::code-group
```tsx [Heading]
/* app/components/Heading.tsx */
import type { FC, JSX, PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const variants = tv({
  base: ['margin-0', 'text-foreground', 'leading-tight', 'tracking-tight'],
  variants: {
    size: {
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    weight: {
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    weight: 'bold',
    align: 'left',
  },
});

type Props = PropsWithChildren<
  {
    level: number;
  } & VariantProps<typeof variants>
>;

export const Heading: FC<Props> = ({ level, size, weight, align, ...props }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return <HeadingTag className={variants({ size, weight, align })} {...props} />;
};
```

```tsx [Body]
/* app/components/Body.tsx */
import type { FC, PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const variants = tv({
  base: ['margin-0', 'text-foreground-variant'],
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    align: 'left',
  },
});

type Props = PropsWithChildren<VariantProps<typeof variants>>;

export const Body: FC<Props> = ({ size, align, ...props }) => (
  <p className={variants({ size, align })} {...props} />
);
```

```tsx [VStack]
/* app/components/VStack.tsx */
import type { FC, PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const variants = tv({
  base: ['flex', 'flex-col'],
  variants: {
    alignHorizontal: {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
    alignVertical: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
  },
});

type Props = PropsWithChildren<
  {
    flex?: number;
    gap?: number;
    width?: number | string;
    height?: number | string;
    padding?: { top: number; right: number; bottom: number; left: number };
    margin?: { top: number; right: number; bottom: number; left: number };
    background?: string;
  } & VariantProps<typeof variants>
>;

export const VStack: FC<Props> = ({
  flex,
  gap,
  width,
  height,
  padding,
  margin,
  background,
  alignHorizontal,
  alignVertical,
  ...props
}) => (
  <div
    className={variants({ alignHorizontal, alignVertical })}
    style={{
      flex,
      gap,
      width,
      height,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      background,
    }}
    {...props}
  />
);
```

```tsx [HStack]
/* app/components/HStack.tsx */
import type { FC, PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const variants = tv({
  base: ['flex', 'flex-row'],
  variants: {
    alignHorizontal: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    alignVertical: {
      stretch: 'items-stretch',
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
  },
});

type Props = PropsWithChildren<
  {
    flex?: number;
    gap?: number;
    width?: number | string;
    height?: number | string;
    padding?: { top: number; right: number; bottom: number; left: number };
    margin?: { top: number; right: number; bottom: number; left: number };
    background?: string;
  } & VariantProps<typeof variants>
>;

export const HStack: FC<Props> = ({
  flex,
  gap,
  width,
  height,
  padding,
  margin,
  background,
  alignHorizontal,
  alignVertical,
  ...props
}) => (
  <div
    className={variants({ alignHorizontal, alignVertical })}
    style={{
      flex,
      gap,
      width,
      height,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      background,
    }}
    {...props}
  />
);
```
:::

## 3. Create the Catalog

Composify needs to know which components it can work with. The Catalog maps your components to the visual editor: prop controls, default values, and categories. This keeps editor metadata separate from your component code.

:::code-group
```tsx [HeadingCatalog]
/* app/components/catalog.tsx */
import { Catalog } from '@composify/react/renderer';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

/* ... */

Catalog.register('Heading', {
  component: Heading,
  category: 'Content',
  props: {
    level: {
      label: 'Level',
      type: 'select',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
      ],
      default: 1,
    },
    size: {
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: '2XL', value: '2xl' },
        { label: '3XL', value: '3xl' },
        { label: '4XL', value: '4xl' },
        { label: '5XL', value: '5xl' },
      ],
      default: '3xl',
    },
    weight: {
      label: 'Font Weight',
      type: 'select',
      options: [
        { label: 'Semibold', value: 'semibold' },
        { label: 'Bold', value: 'bold' },
        { label: 'Extrabold', value: 'extrabold' },
      ],
      default: 'bold',
    },
    align: {
      label: 'Text Align',
      type: 'radio',
      options: [
        { label: <AlignLeftIcon />, value: 'left' },
        { label: <AlignCenterIcon />, value: 'center' },
        { label: <AlignRightIcon />, value: 'right' },
      ],
      default: 'left',
    },
    children: {
      label: 'Text',
      type: 'textarea',
      default: 'Heading',
    },
  },
});

/* ... */
```

```tsx [BodyCatalog]
/* app/components/catalog.tsx */
import { Catalog } from '@composify/react/renderer';
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from 'lucide-react';

/* ... */

Catalog.register('Body', {
  component: Body,
  category: 'Content',
  props: {
    size: {
      label: 'Size',
      type: 'select',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: '2XL', value: '2xl' },
      ],
      default: 'md',
    },
    align: {
      label: 'Text Align',
      type: 'radio',
      options: [
        { label: <AlignLeftIcon />, value: 'left' },
        { label: <AlignCenterIcon />, value: 'center' },
        { label: <AlignRightIcon />, value: 'right' },
      ],
      default: 'left',
    },
    children: {
      label: 'Text',
      type: 'textarea',
      default: 'Body',
    },
  },
});

/* ... */
```

```tsx [VStackCatalog]
/* app/components/catalog.tsx */
import { Catalog } from '@composify/react/renderer';
import {
  AlignCenterVerticalIcon,
  AlignEndVerticalIcon,
  AlignStartVerticalIcon,
  AlignVerticalJustifyCenterIcon,
  AlignVerticalJustifyEndIcon,
  AlignVerticalJustifyStartIcon,
  AlignVerticalSpaceAroundIcon,
  AlignVerticalSpaceBetweenIcon,
  StretchHorizontalIcon,
} from 'lucide-react';

/* ... */

Catalog.register('VStack', {
  component: VStack,
  category: 'Layout',
  props: {
    alignHorizontal: {
      group: 'Layout',
      label: 'Align',
      type: 'radio',
      options: [
        { value: 'stretch', label: <StretchHorizontalIcon /> },
        { value: 'start', label: <AlignStartVerticalIcon /> },
        { value: 'center', label: <AlignCenterVerticalIcon /> },
        { value: 'end', label: <AlignEndVerticalIcon /> },
      ],
      default: 'stretch',
    },
    alignVertical: {
      group: 'Layout',
      label: 'Distribute',
      type: 'radio',
      options: [
        { value: 'start', label: <AlignVerticalJustifyStartIcon /> },
        { value: 'center', label: <AlignVerticalJustifyCenterIcon /> },
        { value: 'end', label: <AlignVerticalJustifyEndIcon /> },
        { value: 'between', label: <AlignVerticalSpaceBetweenIcon /> },
        { value: 'around', label: <AlignVerticalSpaceAroundIcon /> },
      ],
      default: 'start',
    },
    flex: {
      group: 'Layout',
      label: 'Flex',
      type: 'number',
      optional: true,
    },
    gap: {
      group: 'Layout',
      label: 'Gap',
      type: 'number',
      optional: true,
    },
    width: {
      group: 'Size',
      label: 'Width',
      type: 'number',
      default: 100,
      optional: true,
    },
    height: {
      group: 'Size',
      label: 'Height',
      type: 'number',
      default: 100,
      optional: true,
    },
    padding: {
      group: 'Layout',
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
      group: 'Layout',
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
    background: {
      label: 'Background',
      type: 'text',
      default: '#EEEEEE',
      optional: true,
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});

/* ... */
```

```tsx [HStackCatalog]
/* app/components/catalog.tsx */
import { Catalog } from '@composify/react/renderer';
import {
  AlignCenterHorizontalIcon,
  AlignEndHorizontalIcon,
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStartIcon,
  AlignHorizontalSpaceAroundIcon,
  AlignHorizontalSpaceBetweenIcon,
  AlignStartHorizontalIcon,
  StretchVerticalIcon,
} from 'lucide-react';

/* ... */

Catalog.register('HStack', {
  component: HStack,
  category: 'Layout',
  props: {
    alignHorizontal: {
      group: 'Layout',
      label: 'Align',
      type: 'radio',
      options: [
        { value: 'start', label: <AlignHorizontalJustifyStartIcon /> },
        { value: 'center', label: <AlignHorizontalJustifyCenterIcon /> },
        { value: 'end', label: <AlignHorizontalJustifyEndIcon /> },
        { value: 'between', label: <AlignHorizontalSpaceBetweenIcon /> },
        { value: 'around', label: <AlignHorizontalSpaceAroundIcon /> },
      ],
      default: 'start',
    },
    alignVertical: {
      group: 'Layout',
      label: 'Distribute',
      type: 'radio',
      options: [
        { value: 'stretch', label: <StretchVerticalIcon /> },
        { value: 'start', label: <AlignStartHorizontalIcon /> },
        { value: 'center', label: <AlignCenterHorizontalIcon /> },
        { value: 'end', label: <AlignEndHorizontalIcon /> },
      ],
      default: 'stretch',
    },
    flex: {
      group: 'Layout',
      label: 'Flex',
      type: 'number',
      optional: true,
    },
    gap: {
      group: 'Layout',
      label: 'Gap',
      type: 'number',
      optional: true,
    },
    width: {
      group: 'Size',
      label: 'Width',
      type: 'number',
      default: 100,
      optional: true,
    },
    height: {
      group: 'Size',
      label: 'Height',
      type: 'number',
      default: 100,
      optional: true,
    },
    padding: {
      group: 'Layout',
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
      group: 'Layout',
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
    background: {
      label: 'Background',
      type: 'text',
      default: '#EEEEEE',
      optional: true,
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});

/* ... */
```
:::

## 4. Render Pages

Now let's create a dynamic route at `app/routes/page.tsx` to render pages. This fetches the layout from the API and passes it to `<Renderer />`.

```tsx [app/routes/page.tsx]
import '~/components/catalog';

import { Renderer } from '@composify/react/renderer';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';

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
    <main className="p-4">
      <section className="flex items-end justify-between mb-4">
        <h1 className="text-2xl">Rendering page {slug}</h1>
        <a href={`/editor/${slug}`} className="text-blue-500 hover:underline">
          Visit Editor
        </a>
      </section>
      <section className="border rounded-sm border-neutral-200">
        <Renderer source={content} />
      </section>
    </main>
  );
}
```

Make sure to import the catalog at the top of your page so that registration happens when the page loads.

```tsx
import '~/components/catalog'; // [!code hl]

import { Renderer } from '@composify/react/renderer';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';

/* ... */
```

Register the route in `app/routes.ts`:

```ts [app/routes.ts]
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route(':slug', 'routes/page.tsx'),
] satisfies RouteConfig;
```

- [`http://localhost:5173/foo`](http://localhost:5173/foo): displays the saved content
- [`http://localhost:5173/baz`](http://localhost:5173/baz): returns 404 (no data yet)

## 5. Visual Editor

Finally, create the editor page at `app/routes/editor.tsx`. This is where users can drag, drop, and configure your components.

```tsx [app/routes/editor.tsx]
import '~/components/catalog';
import '@composify/react/style.css';

import { Editor } from '@composify/react/editor';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';
  const res = await fetch(`http://localhost:9000/documents/${slug}`);
  const { content } = await res.json().catch(() => ({}));

  return {
    slug,
    content: content ?? '<VStack />',
  };
}

export default function EditorPage() {
  const { slug, content } = useLoaderData<typeof loader>();

  const handleSubmit = async (value: string) => {
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
        content: value,
      }),
    });

    alert('Saved!');
  };

  return <Editor title={`Editing: ${slug}`} source={content} onSubmit={handleSubmit} />;
}
```

Don't forget to register the editor route in `app/routes.ts`:

```ts [app/routes.ts]
import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('editor/:slug', 'routes/editor.tsx'),
  route(':slug', 'routes/page.tsx'),
] satisfies RouteConfig;
```

A couple things to note:

- `@composify/react/style.css` is **required**. It contains the editor's core styles.
- The catalog import (`~/components/catalog`) ensures your components are available in the editor.

## Try It Out

1. Open [`http://localhost:5173/editor/foo`](http://localhost:5173/editor/foo), make some changes, and hit **Save**.
2. Visit [`http://localhost:5173/foo`](http://localhost:5173/foo) to see your changes rendered.
3. Open [`http://localhost:5173/editor/baz`](http://localhost:5173/editor/baz), build a new page from scratch, and save it.
4. Visit [`http://localhost:5173/baz`](http://localhost:5173/baz). The page that was 404 is now live.

## Wrapping Up

That's the basics covered. You now have:

- A **document store** (json-server for now, swap in a real database for production)
- An **editor** for visually composing pages with your own components
- A **renderer** that turns stored JSX into actual UI

Next steps:

- Replace json-server with a proper database
- Add authentication
- Deploy so your team can use it

If you don't want to build the backend yourself, [Composify Cloud](/cloud) handles storage, version history, and collaboration out of the box.
