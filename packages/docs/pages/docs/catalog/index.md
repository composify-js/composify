# Catalog

The **Catalog** is the heart of Composify. Both the editor and the renderer rely on it, as every component must be registered here before it can be used The Catalog is where you define:

- Which components are available in the editor
- What props each component accepts
- How those props should be edited
- Extra settings, like categories or default values

## Registering a component

Use `Catalog.register` to make a component available in Composify. It takes three things:

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

### Unregistered Components

What happens if you try to render a component that hasn't been registered? Composify will simply treat it like a React `Fragment`. This means the component itself won't render, and its props will be ignored.

This way, your app won't crash, and the editor and the renderer will keep rendering everything else that's registered correctly.

## Defining props

If your component has required props (and you're using TypeScript), you'll see type errors until you tell Composify how to handle them. That's where the property specification comes in.

```tsx [catalog.tsx]
Catalog.register('HeroBanner', {
  component: HeroBanner,
  props: {
    tagline: {// [!code hl]
      label: 'Tagline',// [!code hl]
      type: 'text',// [!code hl]
    },// [!code hl]
  },
});
```

Each property specification needs at least a `label` and a `type`. The `type` tells the editor which input control to use. Here's a list of all available types:

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

You can make a prop optional by setting `optional: true`.

```tsx
Catalog.register('HeroBanner', {
  component: HeroBanner,
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
      optional: true,// [!code hl]
    },
  },
});
```
This adds a toggle in the editor next to the prop's label, letting users add or remove the prop on the fly.

## Default values

Each property type comes with a sensible default value so you don't have to specify one every time:

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

You can organize components in the editor by assigning them a `category`. Components with the same category will appear grouped together in the library panel.

```tsx
Catalog.register('HeroBanner', {
  component: HeroBanner,
  category: 'Landing',// [!code hl]
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
    },
  },
});
```

If you don't set a category, the component will be placed under "Uncategorized".
