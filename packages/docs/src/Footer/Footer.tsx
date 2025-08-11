import clsx from 'clsx';
import styles from './Footer.module.css';

export const Footer = () => (
  <section className={styles.footer}>
    <div className={styles.item}>
      <img src="/brand/logo-light.svg" alt="Logo" className={clsx(styles.logo, styles.light)} />
      <img src="/brand/logo-dark.svg" alt="Logo" className={clsx(styles.logo, styles.dark)} />
      <p className={styles.copyright}>© {new Date().getFullYear()} Hills Inc.</p>
    </div>
    <div className={styles.item}>
      <h6 className={styles.footerTitle}>Docs</h6>
      <a href="/docs" className={styles.footerLink}>
        Introduction
      </a>
      <a href="/docs/getting-started" className={styles.footerLink}>
        Getting Started
      </a>
      <a href="/docs/api/catalog" className={styles.footerLink}>
        API Reference
      </a>
    </div>
    <div className={styles.item}>
      <h6 className={styles.footerTitle}>Use Cases</h6>
      <a href="/docs/use-cases/ab-testing-and-prototyping" className={styles.footerLink}>
        Faster Prototyping
      </a>
      <a href="/docs/use-cases/instant-ui-updates" className={styles.footerLink}>
        Instant UI updates
      </a>
      <a href="/docs/use-cases/no-code-tools" className={styles.footerLink}>
        No Code Tools
      </a>
    </div>
    <div className={styles.item}>
      <h6 className={styles.footerTitle}>Company</h6>
      <a href="/contact" className={styles.footerLink}>
        Contact Us
      </a>
      <a href="/blog" className={styles.footerLink}>
        Blog
      </a>
    </div>
  </section>
);
