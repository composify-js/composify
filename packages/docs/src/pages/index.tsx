import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { SourceProvider, SourceRenderer } from '../components/SourceContext';
import '../components/catalog';

const INITIAL_SOURCE = `
  <>
    <HeroBanner
      tagline="Server Driven UI made easy"
      description="Bring visual editing to your components — no rewrites needed."
    />
    <Playground />
    <FeatureGroup>
      <Feature
        title="Keep It Simple with JSX"
        description="Use the markup you already know. Forget complex JSON or custom syntax."
        preview={
          <CodePreview
            language="jsx"
            code={
\`const source = `
  <VStack>
    <HeroBanner
      tagline="Server Driven UI made easy"
      description="Bring visual editing to your components — no rewrites needed."
    />
    <Playground />
    <FeatureGroup>
      <Feature
        title="Keep It Simple with JSX"
        description="Use the markup you already know. Forget complex JSON or custom syntax."
      />
      <Feature
        title="It just works"
        description="No special props. No rigid structure. Just register your components and go."
      />
      <Feature
        title="Instant visual editing"
        description="Drag and drop anything, anywhere. Everything works exactly as you’d expect."
      />
    </Feature>
  </VStack>
`;

  <Renderer source={source} />\`
            }
          />
        }
      />
      <Feature
        title="It just works"
        description="No special props. No rigid structure. Just register your components and go."
        preview={
          <CodePreview
            language="jsx"
            code={
\`import { Catalog } from '@composify/core';
import CodeBlock from '@theme/CodeBlock';
import { ComponentProps } from 'react';

Catalog.register<ComponentProps<typeof CodeBlock>>('CodeBlock', {
  component: CodeBlock,
  props: {
    language: {
      label: 'Language',
      type: 'select',
      options: [{
        label: 'JavaScript',
        value: 'jsx',
      }, {
        label: 'Python',
        value: 'python',
      }],
    },
    children: {
      label: 'Code',
      type: 'textarea',
    },
  },
});\`}
          />
        }
      />
      <Feature
        title="Instant visual editing"
        description="Drag and drop anything, anywhere. Everything works exactly as you’d expect."
      />
    </FeatureGroup>
  </>
`.trim();

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.tagline}`} description="Description will go into a meta tag in <head />">
      <main>
        <SourceProvider source={INITIAL_SOURCE}>
          <SourceRenderer />
        </SourceProvider>
      </main>
    </Layout>
  );
}
