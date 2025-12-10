# Introduction [What is Composify?]

Composify is an open-source library that adds a visual editor to your web application. It allows non-developers to build pages using your existing production components, saving the output as standard JSX strings.

Most visual builders force you into a binary choice: use a rigid "page builder" with generic components (Wix, Squarespace) or adopt a complex headless CMS that requires modifying your code to fit their platform (Builder.io, Puck, Storyblok).

Composify sits in the middle: It is a visual interface for your actual component code.

## How it works

Composify is a package you install directly in your project. It bridges the gap between visual manipulation and your codebase.

### 1. Register components

To enable editing, you register your components in a `Catalog`. This mapping defines which components are available and how their props translate to visual controls like text inputs, toggles, color pickers, or nested slots.

### 2. Standard rendering

The renderer parses input strings and uses the framework's native runtime (e.g., `createElement` in React) to display them.

The "data" for a page is just a string of code:

```tsx
const source = `
  <VStack gap={4}>
    <Text size="xl">Hello World</Text>
    <Button variant="primary">Click Me</Button>
  </VStack>
`;

// Render it anywhere
<Renderer source={source} />
```

### 3. Visual Editing

When that source string is passed to the `<Editor />` component, it transforms into an interactable tree. Users can drag and drop components, modify props via the sidebar, and nest elements naturally.

Upon saving, the editor serializes the tree back into a clean code string, ready to be stored in a database or version control system.

## Open Source vs. Cloud

Composify is open-core. You can use the editor and renderer completely free forever, or use our Cloud solution for managed infrastructure.

| **Feature** | **Composify (Open Source)** | **Composify Cloud** |
| ------- | ----------------------- | --------------- |
| **Editor** | Included | Included |
| **Renderer** | Included | Included |
| **Storage** | You manage (DB, Git, LocalStorage) | Managed (Cloud Database) |
| **Collaboration** | Build it yourself | Real-time Multiplayer |
| **Hosting** | Self-hosted | Managed Hosting |

## Comparison: Composify vs. Alternatives

If you're evaluating visual editors, you've likely looked at Builder.io, Puck or Plasmic.

| **Feature** | Puck | Builder.io | Plasmic | Composify |
| ------- | ---- | ---------- | ------- | --------- |
| **Source of Truth** | JSON | JSON | Proprietary | **JSX** |
| **Rewrite** | Required | Required | Required | **Zero Rewrite** |
| **Infrastructure** | Your backend | Vendor hosting | Vendor hosting | **Anywhere** |
| **Transparency** | Open-source | Open-source | Black-box | **Open-source** |

### The "Zero Rewrite" Philosophy

The problem with most visual editors is that you have to write code for the editor. You might need to wrap your `Button` in a draggable provider, or change how it accepts children to fit their data model.

Composify requires no changes to your component files.

1. **Keep your code clean**: Your `Button.tsx` stays a standard component. No vendor-specific props or refs.
2. **Separate metadata**: All editor configuration happens in an isolated `Catalog` file.
3. **Drop-in**: You can add Composify to a 5-year-old project without refactoring a single legacy component.

## When to use Composify

Use Composify if you:

- Have a component library and want to reuse it.
- Want non-developers to build pages without blocking engineering.
- Need server-driven UI for instant updates without redeployment.
- Want to avoid vendor lock-in.
- Need to test layouts or A/B test page structures quickly.

## Getting started

Start with the [Getting Started](/docs/getting-started) guide or check out the [Component Registration](/docs/catalog) docs.

For hosted infrastructure and collaboration features, see [Composify Cloud](/cloud).
