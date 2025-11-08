import clsx from 'clsx';
import type { FC } from 'react';
import styles from './PlanItem.module.css';

type Props = {
  title: string;
  description: string;
  price: string;
  interval: string;
  features: {
    label: string;
    caption?: string;
    planned?: boolean;
  }[];
  recommended?: boolean;
};

export const PlanItem: FC<Props> = ({ title, description, price, interval, features, recommended }) => (
  <div className={clsx(styles.container, { [styles.recommended]: recommended })}>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
    <div className={styles.price}>
      <p className={styles.priceAmount}>{price}</p>
      <p className={styles.priceInterval}>{interval}</p>
    </div>
    <ul>
      {features.map((feature) => (
        <li key={feature.label} className={styles.feature}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={feature.planned ? styles.planned : styles.shipped}
            width={14}
            height={14}
            viewBox="0 0 512 512"
          >
            <title>{feature.planned ? '☑️' : '✅'}</title>
            <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm84.4-299.3l-80 128c-4.2 6.7-11.4 10.9-19.3 11.3s-15.5-3.2-20.2-9.6l-48-64c-8-10.6-5.8-25.6 4.8-33.6s25.6-5.8 33.6 4.8l27 36 61.4-98.3c7-11.2 21.8-14.7 33.1-7.6s14.7 21.8 7.6 33.1z" />
          </svg>
          <span className={styles.featureLabel}>
            {feature.label}
            <small className={styles.featureCaption}>{feature.caption}</small>
          </span>
        </li>
      ))}
    </ul>
  </div>
);
