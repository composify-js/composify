import CodeBlock from '@theme/CodeBlock';
import { FC } from 'react';
import styles from './CodePreview.module.css';

type Props = {
  language: 'jsx' | 'python';
  code: string;
};

export const CodePreview: FC<Props> = ({ language, code }) => (
  <div className={styles.codePreview}>
    <CodeBlock language={language}>{code}</CodeBlock>
  </div>
);
