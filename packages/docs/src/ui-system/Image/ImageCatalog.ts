import { Catalog } from '@composify/react/renderer';
import { Image } from './Image';

Catalog.register('Image', {
  component: Image,
  category: 'Content',
  props: {
    width: {
      label: 'Width',
      type: 'number',
      default: 100,
    },
    height: {
      label: 'Height',
      type: 'number',
      default: 100,
    },
    src: {
      label: 'Source URL',
      type: 'text',
      default: 'https://composify.js.org/brand/logo-light.png',
    },
    alt: {
      label: 'Alt Text',
      type: 'text',
      default: 'Image',
    },
    loading: {
      label: 'Loading',
      type: 'select',
      options: [
        { label: 'Eager', value: 'eager' },
        { label: 'Lazy', value: 'lazy' },
      ],
      default: 'lazy',
    },
    fetchPriority: {
      label: 'Priority',
      type: 'radio',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Low', value: 'low' },
        { label: 'Auto', value: 'auto' },
      ],
      default: 'auto',
    },
  },
});
