# Expo Tutorial

In this guide, we'll assume you already have an Expo project with [Expo Router](https://expo.github.io/router/docs) up and running. If not, start with the [Expo getting started guide](https://docs.expo.dev/) first.

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

Let's create three simple components: `Heading`, `Body`, and `Button`.

:::code-group
```jsx showLineNumbers [Heading]
/* components/Heading.tsx */
import { type FC, type PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = PropsWithChildren<{
  level?: 1 | 2 | 3;
  weight?: 'semibold' | 'bold' | 'extrabold';
}>;

const TEXT_SIZE_BY_LEVEL = {
  1: 48,
  2: 36,
  3: 24,
} as const;

const FONT_WEIGHT_BY_WEIGHT = {
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

export const Heading: FC<Props> = ({ level = 1, weight = 'extrabold', children }) => (
  <Text
    style={[
      styles.heading,
      {
        fontSize: TEXT_SIZE_BY_LEVEL[level],
        fontWeight: FONT_WEIGHT_BY_WEIGHT[weight],
      },
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  heading: {
    color: '#1E1E1E',
  },
});

```

```jsx showLineNumbers [Body]
/* components/Body.tsx */
import { type FC, type PropsWithChildren } from 'react';
import { Text, StyleSheet } from 'react-native';

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

const FONT_WEIGHT_BY_WEIGHT = {
  light: '300',
  normal: '400',
} as const;

export const Body: FC<Props> = ({ color = '#1E1E1E', weight = 'normal', margin, children }) => (
  <Text
    style={[
      styles.body,
      {
        color,
        fontWeight: FONT_WEIGHT_BY_WEIGHT[weight],
        marginTop: margin?.top,
        marginBottom: margin?.bottom,
        marginLeft: margin?.left,
        marginRight: margin?.right,
      },
    ]}
  >
    {children}
  </Text>
);

const styles = StyleSheet.create({
  body: {
    fontSize: 18,
  },
});
```

```jsx showLineNumbers [Button]
/* components/Button.tsx */
import { type PropsWithChildren } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = PropsWithChildren<{
  variant: 'primary' | 'outline';
}>;

export const Button = ({ variant, children }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { opacity: pressed ? 0.8 : 1 },
        variant === 'primary' ? styles.primary : styles.outline,
      ]}
    >
      <Text style={[styles.buttonText, variant === 'primary' ? styles.primaryText : styles.outlineText]}>
        {children}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
  },
  primary: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#D1D5DB',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FAFAFA',
  },
  outlineText: {
    color: '#1E1E1E',
  },
});
```

```jsx showLineNumbers [VStack]
/* components/VStack.tsx */
import { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';

type Props = PropsWithChildren<{
  flex?: number;
  alignVertical?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  size?: {
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    minHeight?: number;
    maxHeight?: number;
  };
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  backgroundColor?: string;
  gap?: number;
}>;

export const VStack: FC<Props> = ({
  flex,
  alignVertical,
  alignHorizontal,
  size,
  padding,
  margin,
  gap,
  backgroundColor,
  children,
}) => (
  <View
    style={{
      flex,
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
  </View>
);
```

```jsx showLineNumbers [HStack]
/* components/HStack.tsx */
import { type FC, type PropsWithChildren } from 'react';
import { View } from 'react-native';

type Props = PropsWithChildren<{
  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignVertical?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  size?: {
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    minHeight?: number;
    maxHeight?: number;
  };
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
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
  <View
    style={{
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
  </View>
);
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

```jsx showLineNumbers [VStack]
/* components/VStack.tsx */
import { Catalog } from '@composify/react/renderer';

/* ... */

Catalog.register('VStack', {
  component: VStack,
  props: {
    flex: {
      label: 'Flex',
      type: 'number',
      default: 1,
      optional: true,
    },
    gap: {
      label: 'Gap',
      type: 'number',
      default: 0,
      optional: true,
    },
    alignVertical: {
      label: 'Horizontal',
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
    alignHorizontal: {
      label: 'Vertical',
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
          default: 0,
          optional: true,
        },
        maxWidth: {
          label: 'Max Width',
          type: 'number',
          default: 1000,
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
          default: 0,
          optional: true,
        },
        maxHeight: {
          label: 'Max Height',
          type: 'number',
          default: 1000,
          optional: true,
        },
      },
      optional: true,
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
/* components/HStack.tsx */
import { Catalog } from '@composify/react/renderer';

/* ... */

import { Catalog } from '@composify/react/renderer';
import { HStack } from './HStack';

Catalog.register('HStack', {
  component: HStack,
  props: {
    gap: {
      label: 'Gap',
      type: 'number',
      default: 0,
      optional: true,
    },
    alignHorizontal: {
      label: 'Horizontal',
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
      label: 'Vertical',
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
          default: 0,
          optional: true,
        },
        maxWidth: {
          label: 'Max Width',
          type: 'number',
          default: 1000,
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
          default: 0,
          optional: true,
        },
        maxHeight: {
          label: 'Max Height',
          type: 'number',
          default: 1000,
          optional: true,
        },
      },
      optional: true,
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

Finally, export them in `components/index.ts` so you can import them all at once:

```ts [components/index.ts]
export { Heading } from './Heading';
export { Body } from './Body';
export { Button } from './Button';
export { HStack } from './HStack';
export { VStack } from './VStack';
```

## Render a screen

The `Renderer` takes the saved JSX and renders it using your registered components.

```jsx showLineNumbers [app/[slug].tsx]
import '@composify/react/preset';
import '@/components';

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

      setSource(
        content ??
          `
<VStack flex={1} alignHorizontal="center" alignVertical="center">
  <Heading level={3} weight="semibold">Not Found</Heading>
</VStack>
  `.trim()
      );
    };

    fetchData();
  }, [slug]);

  if (!source) {
    return null;
  }

  return <Renderer source={source} />;
}
```

A index screen to bounce around:

```jsx showLineNumbers [app/index.tsx]
import '@composify/react/preset';
import '@/components';

import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Link href="/foo" style={styles.link}>
        Visit Page (/foo)
      </Link>
      <Link href="/editor/foo" style={styles.link}>
        Visit Editor (/foo)
      </Link>
      <Link href="/bar" style={styles.link}>
        Visit Page (/bar)
      </Link>
      <Link href="/editor/bar" style={styles.link}>
        Visit Editor (/bar)
      </Link>
      <Link href="/baz" style={styles.link}>
        Visit Page (/baz)
      </Link>
      <Link href="/editor/baz" style={styles.link}>
        Visit Editor (/baz)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 8,
  },
  link: {
    fontSize: 18,
    color: '#3B82F6',
  },
});
```

Now test it:

- Visit `/foo` to see the saved page.
- Visit `/baz` and you'll get a 404 because there's no data yet.

## Set up the Editor

To create or update content, we'll set up the `Editor` component.

```jsx showLineNumbers [app/editor/[slug].tsx]
import '@composify/react/preset';
import '@composify/react/style.css';
import '@/components';

import { Editor } from '@composify/react/editor';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function EditorPage() {
  const [source, setSource] = useState<string | null>(null);

  const { slug } = useLocalSearchParams<{ slug: string }>();

  if (!source) {
    return null;
  }

  return <Editor title={slug} source={source} />;
}
```

**Notes:**

- `@composify/react/preset` is optional; it just gives you handy layout components like `VStack`.
- `@composify/react/style.css` is **required** — it contains core editor styles.
- Import your components so they're available in the editor.
- The editor runs on the web only. Rendering works everywhere.

### Load the initial source

We'll fetch the saved JSX from our GET API and pass it to the `Editor` as the source prop.

```jsx showLineNumbers [app/editor/[slug].tsx]
import '@composify/react/preset';
import '@composify/react/style.css';
import '@/components';

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

      setSource(content ?? '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />');
    };

    fetchData();
  }, [slug]);

  if (!source) {
    return null;
  }

  return <Editor title={slug} source={source} />;
}
```

Open `/foo` and you should see the editor UI with the document loaded.

### Handle saving

Right now, clicking **Save** does nothing. Let's wire up an `onSubmit` handler so the editor knows how to store the updated content.

```jsx showLineNumbers [app/editor/[slug].tsx]
import '@composify/react/preset';
import '@composify/react/style.css';
import '@/components';

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

      setSource(content ?? '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />');
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

  return <Editor title={slug} source={source} onSubmit={handleSubmit} />;
}
```

## Try it out

1. Navigate to `/foo` in your app to see the saved content.
2. Open `/editor/foo`, make a change, and tap **Save** — the rendered page updates instantly.
3. Navigate to `/baz` and you'll see a 404.
4. Open `/editor/baz`, create some content, tap **Save**, and the new page is live immediately 🎉

## Wrapping up

You now have:

- A **document store** (currently powered by json-server, but could be a real database later)
- An **editor** where you can visually compose pages using your own components
- A **renderer** that turns saved JSX back into real UI

From here, you could:

- Replace json-server with a real database
- Add authentication and user permissions
- Deploy it so your whole team can collaborate

For unlimited bandwidth, built-in version history, and collaboration features, try [Composify Cloud](/cloud) — or self-host it, since it's all open source.
