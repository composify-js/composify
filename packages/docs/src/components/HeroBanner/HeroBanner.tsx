import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './HeroBanner.module.css';

export const HeroBanner = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <section className={styles.heroBanner}>
      <h1 className={styles.title}>{siteConfig.tagline}</h1>
      <p className={styles.description}>Bring visual editing to your components — no rewrites needed.</p>
      <div className={styles.buttonGroup}>
        <a href="/docs" className={styles.learnMore}>
          Learn More ›
        </a>
        <a href="/docs/getting-started" className={styles.getStarted}>
          Get started →
        </a>
      </div>
    </section>
  );
};
