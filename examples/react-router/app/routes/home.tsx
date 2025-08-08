import '@composify/react/preset';
import '~/components';

import { Renderer } from '@composify/react/renderer';

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
    <HStack
      alignVertical="center"
      alignHorizontal="flex-start"
      gap={4}
      margin={{ top: 16 }}
    >
      <Button variant="primary">Learn More ›</Button>
      <Button variant="outline">Get started →</Button>
    </HStack>
  </VStack>
`;

export default function HomePage() {
  return (
    <main className="p-4">
      <section className="flex items-end justify-between mb-4">
        <h1 className="text-2xl">Composify Renderer</h1>
        <a href="/editor" className="text-blue-500 hover:underline">
          Visit Editor
        </a>
      </section>
      <section className="border rounded-sm border-neutral-200">
        <Renderer source={source} />
      </section>
    </main>
  );
}
