import '@composify/react/style.css';

import { Catalog } from '@composify/core';
import { Editor } from '@composify/react';
import { HeroBanner } from '../HeroBanner';
import styles from './Playground.module.css';

Catalog.register('HeroBanner', {
  component: HeroBanner,
  props: {},
});

const source = `
  <HeroBanner />
`;

export const Playground = () => (
  <section className={styles.playground}>
    <Editor
      title="Home Page"
      source={source}
      viewports={[
        {
          width: 320,
          label: 'Mobile S - 320px',
        },
        {
          width: 375,
          label: 'Mobile M - 375px',
        },
        {
          width: 425,
          label: 'Mobile L - 425px',
        },
        {
          width: 768,
          label: 'Tablet - 768px',
          initial: true,
        },
        {
          width: 1024,
          label: 'Laptop - 1024px',
        },
        {
          width: 1440,
          label: 'Desktop - 1440px',
        },
        {
          width: 2560,
          label: '4k - 1440px',
        },
      ]}
    />
  </section>
);
