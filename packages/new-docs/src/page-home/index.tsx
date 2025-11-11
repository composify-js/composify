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
      <Body size="xl" className={['text-foreground', 'mb-40']}>
        Write components once, let anyone build with them through a visual interface.
        <br />
        Perfect for Server Driven UI, no-code website builders, and design tools.
      </Body>
      <Grid columns={1} className={['gap-24', 'md:grid-cols-2']}>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Drop-in integration
            </Heading>
            <Body size="lg">
              No rewrites, no special wrappers. Just register your components, and they're instantly editable.
            </Body>
          </VStack>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              JSX everywhere
            </Heading>
            <Body size="lg">
              Everything is stored as human-readable JSX strings. Not JSON, not a proprietary format.
            </Body>
          </VStack>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Visual + Code editing
            </Heading>
            <Body size="lg">
              Edit visually with drag-and-drop, or switch to code mode with syntax highlighting. Both are always in sync.
            </Body>
          </VStack>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Multi-viewport preview
            </Heading>
            <Body size="lg">
              Preview responsive layouts for mobile, tablet, and desktop using built-in viewport controls.
            </Body>
          </VStack>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Full TypeScript support
            </Heading>
            <Body size="lg">
              Get type-safe component registration, property specifications, and full IDE autocomplete.
            </Body>
          </VStack>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Framework agnostic
            </Heading>
            <Body size="lg">
              Works with Next.js, Expo, React Router, or plain React. Use it anywhere.
            </Body>
          </VStack>
        </VStack>
      </Grid>
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
