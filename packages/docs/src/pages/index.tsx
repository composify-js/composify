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
    <FeatureGroup
      title="Visual editing, powered by your components."
      description="Write components once, let anyone build with them through a visual interface.\nPerfect for design systems, no-code tools, and server-driven UI."
    >
      <Feature
        title="Keep it simple with JSX"
        description="Use the markup you already know. Forget complex JSON or custom syntax."
        preview={<CodePreview asset="/assets/jsx" />}
        wide={false}
        spacing={{ top: 0, bottom: -50 }}
      />
      <Feature
        title="It just works"
        description="No special props. No rigid structure. Just register your components and go."
        preview={<CodePreview asset="/assets/catalog" />}
        wide={false}
        spacing={{ top: 0, bottom: -50 }}
      />
      <Feature
        title="WYSIWYG, tailor-made"
        description="Drag and drop anything, anywhere. Everything works exactly as you'd expect."
        preview={
          <MainCta to="/docs">
            Get started →
          </MainCta>
        }
        wide={true}
        spacing={{ top: 0, bottom: -2 }}
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
