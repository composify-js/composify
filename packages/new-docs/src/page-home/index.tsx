'use client';

import './catalog';
import { SourceProvider, SourceRenderer } from './SourceContext';

const INITIAL_SOURCE = `
  <VStack>
    <VStack className={['gap-4', 'p-24', 'pt-64', 'bg-surface']}>
      <Heading level={1} size="5xl" weight="extrabold">
        Server Driven UI made easy
      </Heading>
      <Body size="2xl" className={['text-foreground']}>
        Bring visual editing to your components — no rewrites needed.
      </Body>
      <HStack className={['gap-8', 'mt-16']}>
        <ButtonCta variant="primary" size="lg" href="/docs">
          Learn more ›
        </ButtonCta>
        <ButtonCta variant="outline" size="lg" href="/demo">
          View Demo →
        </ButtonCta>
      </HStack>
    </VStack>
    <Playground />
    <VStack className={['gap-8', 'p-24', 'pt-64', 'bg-surface']}>
      <Heading level={2} size="4xl" weight="bold">
        Visual editing, powered by your components.
      </Heading>
      <Body size="xl" className={['text-foreground']}>
        Write components once, let anyone build with them through a visual interface.
        <br />
        Perfect for Server Driven UI, no-code website builders, and design tools.
      </Body>
    </VStack>
  </VStack>
`;

export const HomePage = () => (
  <main className="content-container">
    <SourceProvider source={INITIAL_SOURCE}>
      <SourceRenderer />
    </SourceProvider>
  </main>
);
