'use client';

import '@app/parcel-landing/catalog';
import { Editor } from '@composify/react/editor';

const INITIAL_SOURCE = `
  <VStack className={['max-w-7xl', 'mx-auto']}>
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
              Drop-in Integration
            </Heading>
            <Body size="lg">
              No rewrites, no special wrappers. Just register your components, and they're instantly editable.
            </Body>
          </VStack>
          <FeatureItem>
            <CodeSnippet language="tsx" content="dropInIntegration" />
          </FeatureItem>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              JSX Everywhere
            </Heading>
            <Body size="lg">
              Everything is stored as human-readable JSX strings. Not JSON, not a proprietary format.
            </Body>
          </VStack>
          <FeatureItem>
            <CodeSnippet language="tsx" content="jsxEverywhere" />
          </FeatureItem>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Visual + Code Editing
            </Heading>
            <Body size="lg">
              Edit visually with drag-and-drop, or switch to code mode with syntax highlighting. Both are always in sync.
            </Body>
          </VStack>
          <FeatureItem>
          </FeatureItem>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Multi-viewport Preview
            </Heading>
            <Body size="lg">
              Preview responsive layouts for mobile, tablet, and desktop using built-in viewport controls.
            </Body>
          </VStack>
          <FeatureItem>
          </FeatureItem>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Full TypeScript Support
            </Heading>
            <Body size="lg">
              Get type-safe component registration, property specifications, and full IDE autocomplete.
            </Body>
          </VStack>
          <FeatureItem>
          </FeatureItem>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Framework Agnostic
            </Heading>
            <Body size="lg">
              Works with Next.js, Expo, React Router, or plain React. Use it anywhere.
            </Body>
          </VStack>
          <FeatureItem>
          </FeatureItem>
        </VStack>
      </Grid>
    </VStack>
  </VStack>
`.trim();

export const DemoPage = () => <Editor title="Demo" source={INITIAL_SOURCE} />;
