# Custom Viewports

By default, the visual editor includes a set of standard viewport widths. You can override these by passing an array of objects to the `viewports` prop.

```tsx
<Editor
  title="Home Page"
  source={source}
  viewports={[// [!code hl]
    { width: 425, label: "Mobile", initial: true },// [!code hl]
    { width: 1024, label: "Desktop" },// [!code hl]
    { width: 2560, label: "4K" },// [!code hl]
  ]}// [!code hl]
/>
```

Each object in the array defines a viewport and must include a `width` and `label`. You can also set one viewport as the default by adding the optional `initial` property.
