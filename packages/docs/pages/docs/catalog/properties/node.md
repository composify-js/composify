# Node Property

A **node** property accepts any React element or component.
Use it when a component needs to render a nested piece of UI, like an icon, a header, or another custom element.

```tsx showLineNumbers
Catalog.register('Sample', {
  component: Sample,
  props: {
    content: {
      label: 'Content',
      type: 'node', // [!code hl]
    },
  },
});
```

## The `children` Prop

The `children` prop is a special version of the node property.

When you define a prop named `children` with `type: 'node'`, it won't show up in the property panel on the right.
Instead, it enables a more powerful feature: you can drop and arrange child components directly onto the canvas, just like you would in React.

```tsx showLineNumbers
Catalog.register('Sample', {
  component: Sample,
  props: {
    children: { // [!code hl]
      label: 'Children', // [!code hl]
      type: 'node', // [!code hl]
    }, // [!code hl]
  },
});
```
