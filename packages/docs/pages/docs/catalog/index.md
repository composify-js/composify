# Catalog Overview

The **Catalog** is the core of Composify. Both the editor and the renderer rely on it, since every component must be registered there before it can be used. The Catalog defines:

- Which components are available
- What props each component accepts
- How those props should be edited in the UI
- Extra settings (grouping by category, optional or not, ...)

## Registering a component

Use `Catalog.register` to make a component available. It takes three things:

1. The component name
2. The component itself
3. Prop specifications

```tsx [catalog.tsx]
Catalog.register('HeroBanner', {
  component: HeroBanner,
  props: {},
});
```

The **component name** is how Composify identifies it. To keep things simple, we recommend using the same name as the component itself.

The **component** can be any React component (function or class). No restrictions here.

### Unregistered component

If you try to use a component that hasn't been registered, Composify will just treat it like a `Fragment`. In other words, the component itself won't render and its props will be ignored.

This way, the editor and renderer won't crash and they'll keep rendering everything else that's properly registered.

## Defining props

If your component has required props (and you're using TypeScript), you'll see type errors until you tell Composify how to handle those props. That's where the prop specification comes in.

```tsx [catalog.tsx]
Catalog.register('HeroBanner', {
  component: HeroBanner,
  props: {
    tagline: {          // [!code hl]
      label: 'Tagline', // [!code hl]
      type: 'text',     // [!code hl]
    },                  // [!code hl]
  },
});
```

Each prop needs at least two fields: `label` and `type`. The editor picks the right input control based on `type`. Here's the full list:

|                       Type                      |                 Description                 |
|-------------------------------------------------|---------------------------------------------|
| [`boolean`](/docs/catalog/properties/boolean)   | Renders a yes/no toggle                     |
| [`number`](/docs/catalog/properties/number)     | Renders a number input                      |
| [`text`](/docs/catalog/properties/text)         | Renders a single-line text input            |
| [`textarea`](/docs/catalog/properties/textarea) | Renders a multi-line text input             |
| [`radio`](/docs/catalog/properties/radio)       | Renders a button group                      |
| [`select`](/docs/catalog/properties/select)     | Renders a dropdown select                   |
| [`node`](/docs/catalog/properties/node)         | Renders a drop zone for nested components   |
| [`array`](/docs/catalog/properties/array)       | Renders a list of items with sub-fields     |
| [`object`](/docs/catalog/properties/object)     | Renders a set of nested fields              |
| [`custom`](/docs/catalog/properties/custom)     | Lets you implement your own custom UI field |

## Optional props

You can make a prop optional by setting the `optional` field to `true`.

```tsx
Catalog.register('HeroBanner', {
  component: HeroBanner,
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
      optional: true, // [!code hl]
    },
  },
});
```

In the editor, optional props show up with a toggle button next to the label. This lets users add or remove the prop dynamically, instead of always having to provide a value.

## Default values

Each type comes with a default value so you don't always have to specify one yourself:

|                       Type                      |            Default           |
|-------------------------------------------------|------------------------------|
| [`boolean`](/docs/catalog/properties/boolean)   | `false`                      |
| [`number`](/docs/catalog/properties/number)     | `0`                          |
| [`text`](/docs/catalog/properties/text)         | `''`                         |
| [`textarea`](/docs/catalog/properties/textarea) | `''`                         |
| [`radio`](/docs/catalog/properties/radio)       | First option's value          |
| [`select`](/docs/catalog/properties/select)     | First option's value          |
| [`node`](/docs/catalog/properties/node)         | `null`                       |
| [`array`](/docs/catalog/properties/array)       | `[]`                         |
| [`object`](/docs/catalog/properties/object)     | Defaults for each sub-field  |
| [`custom`](/docs/catalog/properties/custom)     | N/A                          |

## Group components

You can organize components in the editor's library by assigning them a category. Components with the same category will appear grouped together.

```tsx
Catalog.register('HeroBanner', {
  component: HeroBanner,
  category: 'Landing', // [!code hl]
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
    },
  },
});
```

If you don't set a category, the component will automatically be placed under "Uncategorized".
