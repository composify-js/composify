import { FC, PropsWithChildren } from 'react';
import styles from './FeatureGroup.module.css';

type Props = PropsWithChildren<{
  title: string;
  description: string;
}>;

export const FeatureGroup: FC<Props> = ({ title, description, children }) => (
  <section className={styles.featureGroup}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.description}>{nl2br(description)}</p>
    <div className={styles.features}>{children}</div>
  </section>
);

const newlineRegex = /(\n|\\n)/g;

const nl2br = (string: string) => {
  if (typeof string !== 'string') {
    return string;
  }

  return string.split(newlineRegex).map((line, index) => {
    if (line.match(newlineRegex)) {
      return <br key={index.toString()} />;
    }

    return line;
  });
};
