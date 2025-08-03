import { Props } from '@theme/Footer/Copyright';
import React, { ReactNode } from 'react';
import styles from './FooterCopyright.module.css';

export const FooterCopyright = ({ copyright }: Props): ReactNode => (
  <p className={styles.Copyright}>
    {copyright}
    <br />
    Website built with Docusaurus.
  </p>
);
