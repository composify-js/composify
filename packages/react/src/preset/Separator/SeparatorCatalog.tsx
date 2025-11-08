import { MoveHorizontalIcon, MoveVerticalIcon } from 'lucide-react';
import { Catalog } from '../../renderer';
import { Separator } from './Separator';

Catalog.register('Separator', {
  component: Separator,
  category: 'Layout',
  props: {
    orientation: {
      label: 'Orientation',
      type: 'radio',
      options: [
        {
          label: <MoveHorizontalIcon />,
          value: 'horizontal',
        },
        {
          label: <MoveVerticalIcon />,
          value: 'vertical',
        },
      ],
      default: 'horizontal',
    },
  },
});
