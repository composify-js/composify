import clsx from 'clsx';
import { FC } from 'react';
import styles from './HeroBanner.module.css';

type Props = {
  tagline: string;
  description: string;
};

export const HeroBanner: FC<Props> = ({ tagline, description }) => (
  <section className={styles.heroBanner}>
    <h1 className={styles.title}>{tagline}</h1>
    <p className={styles.description}>{description}</p>
    <div className={styles.buttonGroup}>
      <a href="/docs" className={clsx(styles.button, styles.learnMore)}>
        Learn more ›
      </a>
      <a href="/docs/getting-started" className={clsx(styles.button, styles.getStarted)}>
        Get started →
      </a>
    </div>
  </section>
);
