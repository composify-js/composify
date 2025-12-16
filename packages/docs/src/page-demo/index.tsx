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
          View demo →
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
    <VStack alignHorizontal="center" className={['gap-40', 'px-24', 'max-md:px-16', 'py-196', 'max-md:py-128']}>
      <VStack className={['gap-8']}>
        <Heading level={2} size="4xl" weight="bold" align="center">
          See what you can build
        </Heading>
        <Body size="xl" align="center" className={['max-w-[610px]', 'text-foreground']}>
          Browse examples and discover what's possible with Server Driven UI. From landing pages to blog, all built with real components.
        </Body>
      </VStack>
      <Grid columns={4} className={['gap-16', 'max-lg:grid-cols-2', 'max-md:grid-cols-1']}>
        <VStack className={['gap-8', 'p-24', 'rounded-sm', 'border', 'bg-background']}>
          <Heading level={3} size="lg" weight="semibold">
            Marketing Campaigns
          </Heading>
          <Body className={['text-foreground']}>
            Launch seasonal sales, flash deals, and product highlights. Update banners and pricing in real-time without bothering engineers.
          </Body>
        </VStack>
        <VStack className={['gap-8', 'p-24', 'rounded-sm', 'border', 'bg-background']}>
          <Heading level={3} size="lg" weight="semibold">
            Landing Pages
          </Heading>
          <Body className={['text-foreground']}>
            Build conversion-focused pages with hero sections, feature grids, and CTAs. Perfect for product launches and signups.
          </Body>
        </VStack>
        <VStack className={['gap-8', 'p-24', 'rounded-sm', 'border', 'bg-background']}>
          <Heading level={3} size="lg" weight="semibold">
            Rapid Prototyping
          </Heading>
          <Body className={['text-foreground']}>
            Test new ideas without waiting for dev cycles. Create beta announcements, feature previews, and A/B test variants instantly.
          </Body>
        </VStack>
        <VStack className={['gap-8', 'p-24', 'rounded-sm', 'border', 'bg-background']}>
          <Heading level={3} size="lg" weight="semibold">
            Editorial Content
          </Heading>
          <Body className={['text-foreground']}>
            Craft rich blog posts, announcements, and help articles. Mix text, images, and callouts with full editorial control.
          </Body>
        </VStack>
      </Grid>
      <ButtonCta variant="primary" size="xl" href="/showcase">
        View examples →
      </ButtonCta>
    </VStack>
  </VStack>
`.trim();

export const DemoPage = () => <Editor title="Demo" source={INITIAL_SOURCE} />;
