# Expo Tutorial

This guide walks you through integrating Composify into an Expo project. We assume you already have an Expo project with [Expo Router](https://docs.expo.dev/router/introduction/) set up. If not, follow the [Expo getting started guide](https://docs.expo.dev/get-started/create-a-project/) first.

Before we begin, make sure your mock API is running on port 9000. (See [Prerequisites](/docs/tutorial/prerequisites) for setup instructions.) We'll use this API to store and retrieve page content.

:::warning[Editor runs on web only]
The visual editor component currently runs on web only. Rendering works everywhere (iOS, Android, and web).
:::

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

## 2. Your Existing Components

Let's say you have these components in your project:

:::code-group
```tsx [Heading]
/* components/Heading.tsx */
import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = PropsWithChildren<{
  size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right';
}>;

export const Heading: FC<Props> = ({ size = 'lg', weight = 'semibold', align = 'left', children }) => (
  <Text
    style={[
      styles.heading,
      styles[`size-${size}`],
      styles[`weight-${weight}`],
      styles[`align-${align}`]
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  heading: {
    color: '#1E1E1E',
  },
  'size-lg': {
    fontSize: 18,
  },
  'size-xl': {
    fontSize: 20,
  },
  'size-2xl': {
    fontSize: 24,
  },
  'size-3xl': {
    fontSize: 30,
  },
  'size-4xl': {
    fontSize: 36,
  },
  'size-5xl': {
    fontSize: 48,
  },
  'weight-semibold': {
    fontWeight: '600',
  },
  'weight-bold': {
    fontWeight: '700',
  },
  'weight-extrabold': {
    fontWeight: '800',
  },
  'align-left': {
    textAlign: 'left',
  },
  'align-center': {
    textAlign: 'center',
  },
  'align-right': {
    textAlign: 'right',
  },
});
```

```tsx [Body]
/* components/Body.tsx */
import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = PropsWithChildren<{
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
}>;

export const Body: FC<Props> = ({ size = 'md', align = 'left', children }) => (
  <Text
    style={[
      styles.body,
      styles[`size-${size}`],
      styles[`align-${align}`],
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  body: {
    color: '#525252',
  },
  'size-sm': {
    fontSize: 14,
  },
  'size-md': {
    fontSize: 16,
  },
  'size-lg': {
    fontSize: 18,
  },
  'align-left': {
    textAlign: 'left',
  },
  'align-center': {
    textAlign: 'center',
  },
  'align-right': {
    textAlign: 'right',
  },
});
```

```tsx [VStack]
/* components/VStack.tsx */
import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = PropsWithChildren<{
  flex?: number;
  gap?: number;
  alignVertical?: 'start' | 'center' | 'end' | 'between' | 'around';
  alignHorizontal?: 'start' | 'center' | 'end' | 'stretch';
  width?: number;
  height?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  margin?: { top: number; right: number; bottom: number; left: number };
  backgroundColor?: string;
}>;

export const VStack: FC<Props> = ({
  flex,
  gap,
  alignVertical = 'start',
  alignHorizontal = 'stretch',
  width,
  height,
  padding,
  margin,
  backgroundColor,
  children,
}) => (
  <View
    style={[
      styles.base,
      styles[`justify-${alignVertical}`],
      styles[`align-${alignHorizontal}`],
      {
        flex,
        gap,
        width,
        height,
        paddingTop: padding?.top,
        paddingRight: padding?.right,
        paddingBottom: padding?.bottom,
        paddingLeft: padding?.left,
        marginTop: margin?.top,
        marginRight: margin?.right,
        marginBottom: margin?.bottom,
        marginLeft: margin?.left,
        backgroundColor,
      },
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'column',
  },
  'justify-start': {
    justifyContent: 'flex-start',
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'justify-end': {
    justifyContent: 'flex-end',
  },
  'justify-between': {
    justifyContent: 'space-between',
  },
  'justify-around': {
    justifyContent: 'space-around',
  },
  'align-start': {
    alignItems: 'flex-start',
  },
  'align-center': {
    alignItems: 'center',
  },
  'align-end': {
    alignItems: 'flex-end',
  },
  'align-stretch': {
    alignItems: 'stretch',
  },
});
```

```tsx [HStack]
/* components/HStack.tsx */
import type { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = PropsWithChildren<{
  flex?: number;
  gap?: number;
  alignHorizontal?: 'start' | 'center' | 'end' | 'between' | 'around';
  alignVertical?: 'start' | 'center' | 'end' | 'stretch';
  width?: number;
  height?: number;
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  margin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  backgroundColor?: string;
}>;

export const HStack: FC<Props> = ({
  flex,
  gap,
  alignHorizontal = 'start',
  alignVertical = 'stretch',
  width,
  height,
  padding,
  margin,
  backgroundColor,
  children,
}) => (
  <View
    style={[
      styles.base,
      styles[`justify-${alignHorizontal}`],
      styles[`align-${alignVertical}`],
      {
        flex,
        gap,
        width,
        height,
        paddingTop: padding?.top,
        paddingRight: padding?.right,
        paddingBottom: padding?.bottom,
        paddingLeft: padding?.left,
        marginTop: margin?.top,
        marginRight: margin?.right,
        marginBottom: margin?.bottom,
        marginLeft: margin?.left,
        backgroundColor,
      },
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
  },
  'justify-start': {
    justifyContent: 'flex-start',
  },
  'justify-center': {
    justifyContent: 'center',
  },
  'justify-end': {
    justifyContent: 'flex-end',
  },
  'justify-between': {
    justifyContent: 'space-between',
  },
  'justify-around': {
    justifyContent: 'space-around',
  },
  'align-start': {
    alignItems: 'flex-start',
  },
  'align-center': {
    alignItems: 'center',
  },
  'align-end': {
    alignItems: 'flex-end',
  },
  'align-stretch': {
    alignItems: 'stretch',
  },
});
```
:::

## 3. Create the Catalog

Composify needs to know which components it can work with. The Catalog maps your components to the visual editor: prop controls, default values, and categories. This keeps editor metadata separate from your component code.

:::code-group
```tsx [HeadingCatalog]
/* components/catalog.ts */
import { Catalog } from '@composify/react/renderer';
import { Heading } from './Heading';

/* ... */

Catalog.register('Heading', {
  component: Heading,
  category: 'Content',
  props: {
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
      default: 'lg',
    },
    weight: {
      label: 'Font Weight',
      type: 'select',
      options: [
        { label: 'Semibold', value: 'semibold' },
        { label: 'Bold', value: 'bold' },
        { label: 'Extrabold', value: 'extrabold' },
      ],
      default: 'semibold',
    },
    children: {
      label: 'Content',
      type: 'textarea',
      default: 'Heading',
    },
  },
});

/* ... */
```

```tsx [BodyCatalog]
/* components/catalog.tsx */
import { Catalog } from '@composify/react/renderer';
import { Body } from './Body';

/* ... */

Catalog.register('Body', {
  component: Body,
  category: 'Content',
  props: {
    size: {
      label: 'Size',
      type: 'radio',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
      ],
      default: 'md',
    },
    align: {
      label: 'Alignment',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      default: 'left',
    },
    children: {
      label: 'Content',
      type: 'textarea',
      default: 'Body',
    },
  },
});

/* ... */
```

```tsx [VStackCatalog]
/* components/catalog.ts */
import { Catalog } from '@composify/react/renderer';
import { VStack } from './VStack';

/* ... */

Catalog.register('VStack', {
  component: VStack,
  category: 'Layout',
  props: {
    alignVertical: {
      group: 'Layout',
      label: 'Distribute',
      type: 'select',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'end' },
        { label: 'Space Between', value: 'between' },
        { label: 'Space Around', value: 'around' },
      ],
      default: 'start',
    },
    alignHorizontal: {
      group: 'Layout',
      label: 'Align',
      type: 'select',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'end' },
        { label: 'Stretch', value: 'stretch' },
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
    backgroundColor: {
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
/* components/HStack/HStackCatalog.ts */
import { Catalog } from '@composify/react/renderer';
import { HStack } from './HStack';

/* ... */

Catalog.register('HStack', {
  component: HStack,
  category: 'Layout',
  props: {
    alignHorizontal: {
      group: 'Layout',
      label: 'Distribute',
      type: 'select',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'end' },
        { label: 'Space Between', value: 'between' },
        { label: 'Space Around', value: 'around' },
      ],
      default: 'start',
    },
    alignVertical: {
      group: 'Layout',
      label: 'Align',
      type: 'select',
      options: [
        { label: 'Start', value: 'start' },
        { label: 'Center', value: 'center' },
        { label: 'End', value: 'end' },
        { label: 'Stretch', value: 'stretch' },
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
    backgroundColor: {
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

## 4. Render Screens

Now let's create a dynamic route at `app/[slug].tsx` to render screens. This fetches the layout from the API and passes it to `<Renderer />`.

```tsx [app/[slug].tsx]
import '@/components/catalog';

import { Renderer } from '@composify/react/renderer';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Page() {
  const [source, setSource] = useState<string | null>(null);

  const { slug } = useLocalSearchParams<{ slug?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:9000/documents/${slug}`, {
        cache: 'no-store',
      });
      const { content } = await res.json().catch(() => ({}));

      setSource(content ?? '<VStack />');
    };

    fetchData();
  }, [slug]);

  if (!source) {
    return null;
  }

  return <Renderer source={source} />;
}
```

Make sure to import the components at the top of your page so that catalog registration happens when the page loads.

```tsx
import '@/components/catalog'; // [!code hl]

import { Renderer } from '@composify/react/renderer';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

/* ... */
```

- `http://localhost:8081/foo`: displays the saved content
- `http://localhost:8081/baz`: shows "Not Found" (no data yet)

## 5. Visual Editor

Finally, create the editor page at `app/editor/[slug].tsx`. This is where users can drag, drop, and configure your components.

```tsx [app/editor/[slug].tsx]
import '@/components/catalog';
import '@composify/react/style.css';

import { Editor } from '@composify/react/editor';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function EditorPage() {
  const [source, setSource] = useState<string | null>(null);

  const { slug } = useLocalSearchParams<{ slug: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:9000/documents/${slug}`, {
        cache: 'no-store',
      });
      const { content } = await res.json().catch(() => ({}));

      setSource(content ?? '<VStack size={{ height: 200 }} backgroundColor="#f8fafc" />');
    };

    fetchData();
  }, [slug]);

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

    Alert.alert('Saved successfully');
  };

  if (!source) {
    return null;
  }

  return <Editor title={`Editing: ${slug}`} source={source} onSubmit={handleSubmit} />;
}
```

A couple things to note:

- `@composify/react/style.css` is **required**. It contains the editor's core styles.
- The catalog import (`@/components/catalog`) ensures your components are available in the editor.

## Try It Out

1. Run your Expo app with `--web` flag (editor requires web).
2. Open `http://localhost:8081/editor/foo`, make some changes, and hit **Save**.
3. Visit `http://localhost:8081/foo` to see your changes rendered.
4. Open `http://localhost:8081/editor/baz`, build a new page from scratch, and save it.
5. Visit `http://localhost:8081/baz`. The page that was "Not Found" is now live.

## Wrapping Up

That's the basics covered. You now have:

- A **document store** (json-server for now, swap in a real database for production)
- An **editor** for visually composing screens with your own components (web only)
- A **renderer** that turns stored JSX into actual UI (works on iOS, Android, and web)

Next steps:

- Replace json-server with a proper database
- Add authentication
- Deploy so your team can use it

If you don't want to build the backend yourself, [Composify Cloud](/cloud) handles storage, version history, and collaboration out of the box.
