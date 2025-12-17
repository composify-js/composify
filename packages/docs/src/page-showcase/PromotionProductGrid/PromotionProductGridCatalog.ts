import { Catalog } from '@composify/react/renderer';
import { PromotionProductGrid } from './PromotionProductGrid';

Catalog.register('PromotionProductGrid', {
  component: PromotionProductGrid,
  category: 'Showcase / Promotion',
  props: {
    title: {
      label: 'Title',
      type: 'text',
      default: 'Featured Products',
    },
    viewAll: {
      label: 'View All',
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
        label: 'View all →',
        href: '#',
      },
    },
    products: {
      label: 'Products',
      type: 'array',
      item: {
        label: 'Product',
        type: 'object',
        fields: {
          imageSrc: { label: 'Image URL', type: 'text', default: 'https://via.placeholder.com/300' },
          category: { label: 'Category', type: 'text', default: 'Category' },
          name: { label: 'Name', type: 'text', default: 'Product Name' },
          price: { label: 'Price', type: 'text', default: '$99' },
          originalPrice: { label: 'Original Price', type: 'text', default: '$149' },
        },
      },
      default: [
        {
          imageSrc: 'https://images.unsplash.com/photo-1624258919367-5dc28f5dc293?w=600&h=600&fit=crop',
          category: 'Audio',
          name: 'AirPods Pro',
          price: '$199',
          originalPrice: '$249',
        },
      ],
    },
  },
});
