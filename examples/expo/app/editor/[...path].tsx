import '@composify/react/preset';
import '@composify/react/style.css';
import '../../components';

import { Editor } from '@composify/react/editor';
import { useLocalSearchParams } from 'expo-router';

export default function EditorPage() {
  const { path } = useLocalSearchParams<{ path?: string | string[] }>();
  const slug = '/' + (Array.isArray(path) ? path.join('/') : (path ?? ''));

  const source = `
    <VStack
      alignVertical="center"
      alignHorizontal="stretch"
      padding={{ top: 16, bottom: 16, left: 16, right: 16 }}
      gap={4}
    >
      <Heading level={1} weight="extrabold">Server Driven UI made easy</Heading>
      <Body color="#1E1E1E" weight="normal">
        Bring visual editing to your components — no rewrites needed.
      </Body>
      <HStack
        alignVertical="stretch"
        alignHorizontal="flex-start"
        gap={4}
        margin={{ top: 16 }}
      >
        <Button variant="primary">Learn More ›</Button>
        <Button variant="outline">Get started →</Button>
      </HStack>
    </VStack>
  `;

  return <Editor title={slug} source={source} />;
}
