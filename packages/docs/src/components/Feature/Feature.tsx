import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import styles from './Feature.module.css';

type Props = {
  title: string;
  description: string;
  preview?: ReactNode;
  wide?: boolean;
};

export const Feature: FC<Props> = ({ title, description, preview, wide }) => (
  <section className={clsx(styles.feature, { [styles.wide]: wide })}>
    <div className={styles.banner}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
    {preview}
  </section>
);
