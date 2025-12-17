import { Catalog } from '@composify/react/renderer';
import { PromotionHeroBanner } from './PromotionHeroBanner';

Catalog.register('PromotionHeroBanner', {
  component: PromotionHeroBanner,
  category: 'Showcase / Promotion',
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
      default: 'Holiday Collection',
    },
    title: {
      label: 'Title',
      type: 'text',
      default: 'Gifts they will love',
    },
    description: {
      label: 'Description',
      type: 'text',
      default: 'Discover our curated selection of premium gifts.',
    },
    primaryCta: {
      label: 'Primary CTA',
      type: 'object',
      fields: {
        label: {
          label: 'Label',
          type: 'text',
        },
        href: {
          label: 'Link',
          type: 'text',
        },
      },
      default: {
        label: 'Shop now',
        href: '#',
      },
    },
    secondaryCta: {
      label: 'Secondary CTA',
      type: 'object',
      fields: {
        label: {
          label: 'Label',
          type: 'text',
        },
        href: {
          label: 'Link',
          type: 'text',
        },
      },
      default: {
        label: 'View all deals',
        href: '#',
      },
    },
    imageSrc: {
      label: 'Image URL',
      type: 'text',
      default: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&h=500&fit=crop',
    },
  },
});
