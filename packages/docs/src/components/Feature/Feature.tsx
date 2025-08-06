import { FC } from 'react';
import styles from './Feature.module.css';

type Props = {
  title: string;
  description: string;
  cta: {
    text: string;
    link: string;
  };
};

export const Feature: FC<Props> = ({ title, description, cta }) => (
  <section className={styles.feature}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.description}>{description}</p>
    <a className={styles.cta} href={cta.link}>
      {cta.text}
    </a>
  </section>
);
