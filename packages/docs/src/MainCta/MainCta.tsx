import { type FC } from 'react';
import styles from './MainCta.module.css';

type Props = {
  to: string;
  children: string;
};

export const MainCta: FC<Props> = ({ to, children }) => (
  <a href={to} className={styles.mainCta}>
    {children}
  </a>
);
