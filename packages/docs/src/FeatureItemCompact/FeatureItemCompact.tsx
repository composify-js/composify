import { type FC } from 'react';
import styles from './FeatureItemCompact.module.css';

type Props = {
  emoji: string;
  title: string;
  description: string;
  planned?: boolean;
};

export const FeatureItemCompact: FC<Props> = ({ emoji, title, description, planned }) => (
  <div className={styles.container}>
    {planned && <span className={styles.planned}>Coming soon!</span>}
    <span className={styles.emoji}>{emoji}</span>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
  </div>
);
