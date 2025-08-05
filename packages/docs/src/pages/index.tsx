import { Catalog } from '@composify/core';
import { Renderer } from '@composify/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ComponentProps } from 'react';
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

const INITIAL_SOURCE = `
  <>
    <HeroBanner
      tagline="Server Driven UI made easy"
      description="Bring visual editing to your components — no rewrites needed."
    />
    <Playground />
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
