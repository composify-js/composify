import clsx from 'clsx';
import { type FC, type ReactNode } from 'react';
import styles from './Feature.module.css';

type Props = {
  title: string;
  description: string;
  preview: ReactNode;
  wide: boolean;
  spacing: {
    top: number;
    bottom: number;
  };
};

export const Feature: FC<Props> = ({ title, description, spacing, preview, wide }) => (
  <section className={clsx(styles.feature, { [styles.wide]: wide })}>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
    <div style={{ marginTop: spacing.top, marginBottom: spacing.bottom }}>{preview}</div>
  </section>
);
