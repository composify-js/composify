'use client';

import './catalog';
import { SourceProvider, SourceRenderer } from './SourceContext';

const INITIAL_SOURCE = `
  <VStack>
    <VStack gap={4} padding={{ top: 64, bottom: 24, left: 24, right: 24 }} background="surface">
      <Text level={1} size="5xl" weight="extrabold" tracking="tight" leading="tighter" color="on-surface">
        Server Driven UI made easy
      </Text>
      <Text size="2xl" color="on-surface">
        Bring visual editing to your components — no rewrites needed.
      </Text>
      <HStack gap={8} margin={{ top: 16 }}>
        <ButtonCta variant="primary" size="lg" href="/docs">
          Learn more ›
        </ButtonCta>
        <ButtonCta variant="outline" size="lg" href="/demo">
          View Demo →
        </ButtonCta>
      </HStack>
    </VStack>
    <Playground />
  </VStack>
`;

export const HomePage = () => (
  <main className="content-container">
    <SourceProvider source={INITIAL_SOURCE}>
      <SourceRenderer />
    </SourceProvider>
  </main>
);
