import { Catalog } from '@composify/core';
import { Renderer } from '@composify/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ComponentProps } from 'react';
import { Feature } from '../components/Feature';
import { HeroBanner } from '../components/HeroBanner';
import { Playground } from '../components/Playground';
import { SourceProvider, useSource } from '../components/SourceContext';

Catalog.register<ComponentProps<typeof HeroBanner>>('HeroBanner', {
  component: HeroBanner,
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
      default: 'Server Driven UI made easy',
    },
    description: {
      label: 'Description',
      type: 'textarea',
      default: 'Bring visual editing to your components — no rewrites needed.',
    },
  },
});

Catalog.register<ComponentProps<typeof Playground>>('Playground', {
  component: Playground,
  props: {},
});

Catalog.register<ComponentProps<typeof Feature>>('Feature', {
  component: Feature,
  props: {
    title: {
      label: 'Title',
      type: 'text',
      default: 'Instant visual editing',
    },
    description: {
      label: 'Description',
      type: 'textarea',
      default: 'Drag and drop anything, anywhere. Everything works exactly as you’d expect.',
    },
    cta: {
      label: 'Call to Action',
      type: 'object',
      default: {
        text: 'Learn More',
        link: '/docs/intro',
      },
      fields: {
        text: {
          label: 'Text',
          type: 'text',
          default: 'Learn More',
        },
        link: {
          label: 'Link',
          type: 'text',
          default: '/docs/intro',
        },
      },
    },
  },
});

const INITIAL_SOURCE = `
  <>
    <HeroBanner
      tagline="Server Driven UI made easy"
      description="Bring visual editing to your components — no rewrites needed."
    />
    <Playground />
    <Feature
      title="Instant visual editing"
      description="Drag and drop anything, anywhere. Everything works exactly as you’d expect."
      cta={{ text: 'Start Editing ›', link: '/docs/getting-started' }}
    />
    <Feature
      title="Keep It Simple with JSX"
      description="Use the markup you already know. Forget complex JSON or custom syntax."
      cta={{ text: 'Get Started ›', link: '/docs/getting-started' }}
    />
    <Feature
      title="It just works"
      description="No special props. No rigid structure. Just register your components and go."
      cta={{ text: 'Learn More', link: '/docs/intro' }}
    />
  </>
`.trim();

const HomeRenderer = () => {
  const { source } = useSource();

  return <Renderer source={source} />;
};

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.tagline}`} description="Description will go into a meta tag in <head />">
      <main>
        <SourceProvider source={INITIAL_SOURCE}>
          <HomeRenderer />
        </SourceProvider>
      </main>
    </Layout>
  );
}
