import '@app/parcel-landing/catalog';
import { Editor } from '@composify/react/editor';

const INITIAL_SOURCE = `
  <VStack>
    <VStack className={['gap-6', 'p-24', 'pt-64', 'bg-background', 'max-md:px-16']}>
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
    <VStack className={['gap-8', 'p-24', 'mt-40', 'bg-background', 'max-md:px-16']}>
      <Heading level={2} size="4xl" weight="bold">
        Visual editing, powered by your components.
      </Heading>
      <Body size="xl" className={['text-foreground', 'mb-40']}>
        Write components once, let anyone build with them through a visual interface.
        <br />
        Perfect for Server Driven UI, no-code website builders, and design tools.
      </Body>
      <Grid columns={1} className={['gap-24', 'md:grid-cols-2']}>
      <VStack className={['rounded-sm', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Drop-in Integration
            </Heading>
            <Body size="lg">
              No rewrites, no special wrappers. Just register your components, and they're instantly editable.
            </Body>
          </VStack>
          <FeaturePreview>
            <CodeSnippet language="tsx" content="dropInIntegration" />
          </FeaturePreview>
        </VStack>
      <VStack className={['rounded-sm', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              JSX Everywhere
            </Heading>
            <Body size="lg">
              Everything is stored as human-readable JSX strings. Not JSON, not a proprietary format.
            </Body>
          </VStack>
          <FeaturePreview>
            <CodeSnippet language="tsx" content="jsxEverywhere" />
          </FeaturePreview>
        </VStack>
      <VStack className={['rounded-sm', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Visual + Code Editing
            </Heading>
            <Body size="lg">
              Edit visually with drag-and-drop, or switch to code mode with syntax highlighting. Both are always in sync.
            </Body>
          </VStack>
          <FeaturePreview>
            <EditorControl />
          </FeaturePreview>
        </VStack>
      <VStack className={['rounded-sm', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Multi-viewport Preview
            </Heading>
            <Body size="lg">
              Preview responsive layouts for mobile, tablet, and desktop using built-in viewport controls.
            </Body>
          </VStack>
          <FeaturePreview>
            <ViewportControl />
          </FeaturePreview>
        </VStack>
      <VStack className={['rounded-sm', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Full TypeScript Support
            </Heading>
            <Body size="lg">
              Get type-safe component registration, property specifications, and full IDE autocomplete.
            </Body>
          </VStack>
          <FeaturePreview>
            <Image
              width={512}
              height={512}
              className="m-auto w-1/2 h-1/2"
              src="/assets/feature-typescript.svg"
              alt="Full TypeScript support"
              loading="eager"
              fetchPriority="high"
            />
          </FeaturePreview>
        </VStack>
      <VStack className={['rounded-sm', 'border']}>
          <VStack className={['flex-1', 'p-32', 'gap-6']}>
            <Heading level={3} size="2xl" weight="semibold">
              Framework Agnostic
            </Heading>
            <Body size="lg">
              Works with Next.js, Expo, React Router, or plain React. Use it anywhere.
            </Body>
          </VStack>
          <FeaturePreview>
            <FrameworkList />
          </FeaturePreview>
        </VStack>
      </Grid>
    </VStack>
    <VStack alignHorizontal="center" className={['gap-8', 'px-24', 'py-196']}>
      <Heading level={2} size="4xl" weight="bold" align="center">
        Unlock the full potential of your team
      </Heading>
      <Body size="xl" align="center" className={['text-foreground', 'mb-32']}>
        Move from idea to production in minutes.
        <br />
        Build faster, collaborate better, and ship with confidence.
      </Body>
      <ButtonCta variant="primary" size="xl" href="/docs">
        Start Building ›
      </ButtonCta>
    </VStack>
  </VStack>
`.trim();

export const DemoPage = () => <Editor title="Demo" source={INITIAL_SOURCE} />;
