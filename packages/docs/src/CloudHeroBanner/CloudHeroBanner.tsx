import { type FC } from 'react';
import styles from './CloudHeroBanner.module.css';

export const CloudHeroBanner: FC = () => (
  <section className={styles.heroBanner}>
    <h1 className={styles.title}>Supercharge your editor</h1>
    <p className={styles.description}>All the power you need, without the hassle.</p>
  </section>
);
