import { Catalog } from '@composify/react/renderer';
import { PromotionCountdown } from './PromotionCountdown';

Catalog.register('PromotionCountdown', {
  component: PromotionCountdown,
  category: 'Showcase / Promotion',
  props: {
    message: {
      label: 'Message',
      type: 'text',
      default: 'Limited time offer!',
    },
    endDate: {
      label: 'End Date',
      type: 'text',
      default: new Date(Date.now() + 86400 * 1000).toISOString(),
    },
  },
});
