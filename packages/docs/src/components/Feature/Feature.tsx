import CodeBlock from '@theme/CodeBlock';
import { FC } from 'react';
import styles from './Feature.module.css';

type Props = {
  title: string;
  description: string;
};

export const Feature: FC<Props> = ({ title, description }) => (
  <section className={styles.feature}>
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.description}>{description}</p>
    <CodeBlock language="jsx">
      {`const source = \`
  <Feature
    title="Keep It Simple with JSX"
    description="Use the markup you already know. Forget complex JSON or custom syntax."
  />
\`;

<Renderer source={source} />`}
    </CodeBlock>
  </section>
);
