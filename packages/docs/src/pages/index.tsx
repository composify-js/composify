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
    <Feature
      title="Keep It Simple with JSX"
      description="Use the markup you already know. Forget complex JSON or custom syntax."
      preview={
        <CodeBlock language="jsx" children={\`const source = `
  <Feature
    title="Keep It Simple with JSX"
    description="Use the markup you already know. Forget complex JSON or custom syntax."
  />
`;

<Renderer source={source} />\`} />
      }
    />
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
