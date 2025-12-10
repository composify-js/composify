import { Catalog } from '@composify/react/renderer';
import { FeaturePreview } from './FeaturePreview';

Catalog.register('FeaturePreview', {
  component: FeaturePreview,
  category: 'Landing',
  props: {
    children: {
      label: 'Content',
      type: 'node',
    },
  },
});
