import '@composify/react/preset';
import '@composify/react/style.css';
import '../components';

import { Editor } from '@composify/react/editor';

export function meta() {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

const source = `
  <VStack
    alignVertical="center"
    alignHorizontal="flex-start"
    padding={{ top: 16, bottom: 16, left: 16, right: 16 }}
    gap={4}
  >
    <Heading level={1} weight="extrabold">Server Driven UI made easy</Heading>
    <Body color="#1E1E1E" weight="normal">
      Bring visual editing to your components — no rewrites needed.
    </Body>
  </VStack>
`;

export default function EditorPage() {
  return <Editor title="Composify" source={source} />;
}
