import { FC, PropsWithChildren } from 'react';
import styles from './FeatureGroup.module.css';

export const FeatureGroup: FC<PropsWithChildren> = ({ children }) => (
  <section className={styles.featureGroup}>
    <h2 className={styles.title}>Visual editing, powered by your own components.</h2>
    <p className={styles.description}>
      Write components once, then let anyone build with them through an intuitive visual interface. Perfect for design
      systems, no-code tools, and server-driven UI.
    </p>
    <div className={styles.features}>{children}</div>
  </section>
);
