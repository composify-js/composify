import styles from './Footer.module.css';

export const Footer = () => (
  <section className={styles.container}>
    <div className={styles.column}>
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet="/brand/logo-dark.svg" />
        <source media="(prefers-color-scheme: light)" srcSet="/brand/logo-light.svg" />
        <img src="/brand/logo-light.svg" alt="Logo" />
      </picture>
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
      <a href="https://github.com/composify-js/composify" className={styles.item}>
        Github
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
      <h6 className={styles.title}>Cloud</h6>
      <a href="https://app.composify.cloud" className={styles.item}>
        Dashboard
      </a>
      <a href="https://app.composify.cloud/terms" className={styles.item}>
        Terms of Service
      </a>
      <a href="https://app.composify.cloud/privacy" className={styles.item}>
        Privacy Policy
      </a>
      <a href="mailto:support@composify.cloud" className={styles.item}>
        Contact
      </a>
    </div>
  </section>
);
