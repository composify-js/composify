import clsx from 'clsx';
import { type FC } from 'react';
import styles from './CloudHeroBanner.module.css';

export const CloudHeroBanner: FC = () => (
  <section className={styles.heroBanner}>
    <h1 className={styles.title}>Supercharge your editor</h1>
    <p className={styles.description}>All the power you need, without the hassle.</p>
    <div className={styles.buttonGroup}>
      <a href="https://app.composify.net" className={clsx(styles.button, styles.learnMore)}>
        Start free ›
      </a>
      <a href="#features" className={clsx(styles.button, styles.getStarted)}>
        Explore features →
      </a>
    </div>
  </section>
);
