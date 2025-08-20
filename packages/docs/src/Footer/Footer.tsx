import clsx from 'clsx';
import styles from './Footer.module.css';

export const Footer = () => (
  <section className={styles.container}>
    <div className={styles.column}>
      <img src="/brand/logo-light.svg" alt="Logo" className={clsx(styles.logo, styles.light)} />
      <img src="/brand/logo-dark.svg" alt="Logo" className={clsx(styles.logo, styles.dark)} />
      <p className={styles.copyright}>
        © {new Date().getFullYear()} Hills Inc.
        <br />
        Icons from <a href="https://fontawesome.com">Font Awesome Free</a>.
      </p>
    </div>
    <div className={styles.column}>
      <h6 className={styles.title}>Docs</h6>
      <a href="/docs" className={styles.item}>
        Introduction
      </a>
      <a href="/docs/getting-started" className={styles.item}>
        Getting Started
      </a>
      <a href="/docs/tutorial/prerequisites" className={styles.item}>
        Tutorial
      </a>
    </div>
    <div className={styles.column}>
      <h6 className={styles.title}>Use Cases</h6>
      <a href="/docs/use-cases/ab-testing-and-prototyping" className={styles.item}>
        Faster Prototyping
      </a>
      <a href="/docs/use-cases/no-code-tools" className={styles.item}>
        No Code Tools
      </a>
      <a href="/docs/use-cases/instant-ui-updates" className={styles.item}>
        Instant UI updates
      </a>
      <a href="/docs/use-cases/headless-cms" className={styles.item}>
        Headless CMS
      </a>
    </div>
    <div className={styles.column}>
      <h6 className={styles.title}>Company</h6>
      <a href="/contact" className={styles.item}>
        Contact Us
      </a>
      <a href="/blog" className={styles.item}>
        Blog
      </a>
    </div>
  </section>
);
