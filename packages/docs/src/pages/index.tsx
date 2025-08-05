import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { HeroBanner } from '../components/HeroBanner';
import { Playground } from '../components/Playground';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`${siteConfig.tagline}`} description="Description will go into a meta tag in <head />">
      <main>
        <HeroBanner />
        <Playground />
      </main>
    </Layout>
  );
}
