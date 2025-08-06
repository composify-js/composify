import { FC, ReactNode } from 'react';
import styles from './Feature.module.css';

type Props = {
  title: string;
  description: string;
  preview?: ReactNode;
};

export const Feature: FC<Props> = ({ title, description, preview }) => (
  <section className={styles.feature}>
    <div className={styles.banner}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
    {preview && <div className={styles.preview}>{preview}</div>}
  </section>
);
