'use client';

import '@app/parcel-landing/catalog';
import { SourceProvider, SourceRenderer } from '@app/parcel-landing';

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
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
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
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
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
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Visual + Code Editing
            </Heading>
            <Body size="lg">
              Edit visually with drag-and-drop, or switch to code mode with syntax highlighting. Both are always in sync.
            </Body>
          </VStack>
          <FeatureItem>
            <Image
              width={4397}
              height={2358}
              src="/assets/feature-split-view.png"
              alt="Visual + Code Editing"
              loading="eager"
              priority={true}
            />
          </FeatureItem>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Multi-viewport Preview
            </Heading>
            <Body size="lg">
              Preview responsive layouts for mobile, tablet, and desktop using built-in viewport controls.
            </Body>
          </VStack>
          <FeatureItem>
            <Image
              width={885}
              height={737}
              src="/assets/feature-multi-viewport.png"
              alt="Multi-viewport preview"
              loading="eager"
              priority={true}
            />
          </FeatureItem>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Full TypeScript Support
            </Heading>
            <Body size="lg">
              Get type-safe component registration, property specifications, and full IDE autocomplete.
            </Body>
          </VStack>
          <FeatureItem>
            <Image
              width={512}
              height={512}
              className="m-auto w-1/2 h-1/2"
              src="/assets/feature-typescript.svg"
              alt="Full TypeScript support"
              loading="eager"
              priority={true}
            />
          </FeatureItem>
        </VStack>
        <VStack className={['rounded-md', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Framework Agnostic
            </Heading>
            <Body size="lg">
              Works with Next.js, Expo, React Router, or plain React. Use it anywhere.
            </Body>
          </VStack>
          <FeatureItem>
            <FrameworkList />
          </FeatureItem>
        </VStack>
      </Grid>
    </VStack>
  </VStack>
`.trim();

export const HomePage = () => (
  <SourceProvider source={INITIAL_SOURCE}>
    <SourceRenderer />
  </SourceProvider>
);
