import '../../preset';
import { Editor } from './Editor';

export const BasicUsage = () => {
  const source = `
    <VStack
      alignHorizontal="stretch"
      alignVertical="start"
      gap={8}
      background="#ffffff"
    >
      <Text color="#1E1E1E" size="md" weight="normal" align="left">Welcome to Composify! 👋</Text>
      <HStack
        alignHorizontal="start"
        alignVertical="stretch"
        background="#f8fafc"
      >
        <HStack
          alignHorizontal="start"
          alignVertical="stretch"
          width={100}
          height={100}
          background="#f1f5f9"
        />
        <HStack
          alignHorizontal="start"
          alignVertical="stretch"
          width={125}
          height={100}
          background="#e2e8f0"
        />
        <HStack
          alignHorizontal="start"
          alignVertical="stretch"
          width={150}
          height={100}
          background="#cbd5e1"
        />
      </HStack>
      <HStack
        alignHorizontal="start"
        alignVertical="stretch"
        height={100}
        background="#f1f5f9"
      />
      <HStack
        alignHorizontal="start"
        alignVertical="stretch"
        height={100}
        background="#cbd5e1"
      />
    </VStack>
  `;

  return <Editor title="Lorem Ipsum" source={source} onSubmit={console.log} />;
};
