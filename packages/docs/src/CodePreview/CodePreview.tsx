/** biome-ignore-all lint/performance/noImgElement: vite */
import type { FC } from 'react';
import styles from './CodePreview.module.css';

type Props = {
  asset: string;
};

export const CodePreview: FC<Props> = ({ asset }) => (
  <div className={styles.container}>
    <img className={styles.light} src={`${asset}-light.png`} alt="logo" />
    <img className={styles.dark} src={`${asset}-dark.png`} alt="logo" />
  </div>
);
