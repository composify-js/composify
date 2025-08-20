# Custom Controls

To replace the default toolbar, pass a `renderControl` function.
This function receives a `getSource` callback that returns the current JSX string.

```tsx showLineNumbers
<Editor
  title="Demo"
  source={source}
  renderControl={getSource => (
    <Button variant="primary" onSubmit={() => handleSubmit(getSource())}>
      Publish
    </Button>
  )}
/>
```

This allows you to implement separate actions, such as "Save" and "Publish".

```tsx showLineNumbers
<Editor
  title="Demo"
  source={source}
  renderControl={getSource => (
    <HStack gap={8}>
      <Button variant="secondary" onSubmit={() => handleSave(getSource())}>
        Save
      </Button>
      <Button variant="primary" onSubmit={handlePublish}>
        Publish
      </Button>
    </HStack>
  )}
/>
```
