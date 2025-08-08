import { Catalog } from '../../renderer';
import { Editor } from './Editor';
import '../../preset';

const Text = ({ children, textAlign }: { children: string; textAlign: 'left' | 'center' | 'right' }) => (
  <span style={{ textAlign }}>{children}</span>
);

Catalog.register('Text', {
  component: Text,
  props: {
    children: {
      label: 'Content',
      type: 'text',
      default: 'Lorem ipsum',
    },
    textAlign: {
      label: 'Text Align',
      type: 'radio',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      default: 'left',
    },
  },
});

export const BasicUsage = () => {
  const source = `
    <VStack
      flexGrow={1}
      gap={8}
      alignVertical="flex-start"
      alignHorizontal="stretch"
      backgroundColor="#ffffff"
      overflow="visible"
    >
      <Text textAlign="left">Welcome to Composify! 👋</Text>
      <HStack
        flexGrow={1}
        alignVertical="stretch"
        alignHorizontal="flex-start"
        backgroundColor="#f8fafc"
        overflow="visible"
      >
        <HStack
          flexGrow={0}
          alignVertical="stretch"
          alignHorizontal="flex-start"
          size={{ width: 100, height: 100 }}
          backgroundColor="#f1f5f9"
        />
        <HStack
          flexGrow={0}
          alignVertical="stretch"
          alignHorizontal="flex-start"
          size={{ width: 125, height: 100 }}
          backgroundColor="#e2e8f0"
        />
        <HStack
          flexGrow={0}
          alignVertical="stretch"
          alignHorizontal="flex-start"
          size={{ width: 150, height: 100 }}
          backgroundColor="#cbd5e1"
        />
      </HStack>
      <HStack
        flexGrow={1}
        alignVertical="stretch"
        alignHorizontal="flex-start"
        size={{ height: 100 }}
        backgroundColor="#f1f5f9"
      />
      <HStack
        flexGrow={1}
        alignVertical="stretch"
        alignHorizontal="flex-start"
        size={{ height: 100 }}
        backgroundColor="#cbd5e1"
      />
    </VStack>
  `;

  return <Editor title="Lorem Ipsum" source={source} onSubmit={console.log} />;
};
