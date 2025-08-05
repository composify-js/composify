import '@composify/react/style.css';

import { Catalog } from '@composify/core';
import { Editor } from '@composify/react';
import { ComponentProps } from 'react';
import { HeroBanner } from '../HeroBanner';
import { ViewportScaler } from '../ViewportScaler';
import styles from './Playground.module.css';

const PLAYGROUND_WIDTH = 1286;

Catalog.register<ComponentProps<typeof HeroBanner>>('HeroBanner', {
  component: HeroBanner,
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
      default: 'Server Driven UI made easy',
    },
    description: {
      label: 'Description',
      type: 'textarea',
      default: 'Bring visual editing to your components — no rewrites needed.',
    },
  },
});

const source = `
  <HeroBanner
    tagline="Server Driven UI made easy"
    description="Bring visual editing to your components — no rewrites needed."
  />
`;

export const Playground = () => (
  <section className={styles.playground}>
    <div className={styles.preview}>
      <ViewportScaler width={PLAYGROUND_WIDTH}>
        <Editor title="Home Page" source={source} />
      </ViewportScaler>
    </div>
    <p className={styles.description}>
      Try our editor — the rendered result appears <a href="/preview">here</a>.
    </p>
  </section>
);
