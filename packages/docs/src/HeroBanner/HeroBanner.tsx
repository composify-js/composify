import clsx from 'clsx';
import { type FC } from 'react';
import styles from './HeroBanner.module.css';

type Props = {
  tagline: string;
  description: string;
  actions: {
    label: string;
    href: string;
    primary?: boolean;
  }[];
};

export const HeroBanner: FC<Props> = ({ tagline, description, actions }) => (
  <section className={styles.container}>
    <h1 className={styles.title}>{tagline}</h1>
    <p className={styles.description}>{description}</p>
    <div className={styles.buttonGroup}>
      {actions.map(action => (
        <a
          key={action.label}
          href={action.href}
          className={clsx(styles.button, {
            [styles.primary]: action.primary,
            [styles.secondary]: !action.primary,
          })}
        >
          {action.label}
        </a>
      ))}
    </div>
  </section>
);
