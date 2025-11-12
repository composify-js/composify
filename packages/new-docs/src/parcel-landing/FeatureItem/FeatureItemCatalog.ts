import { Catalog } from '@composify/react/renderer';
import { FeatureItem } from './FeatureItem';

Catalog.register('FeatureItem', {
  component: FeatureItem,
  category: 'Content',
  props: {
    children: {
      label: 'Content',
      type: 'node',
    },
  },
});
