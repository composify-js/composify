import { Body, Caption, VStack } from '@app/ui-system';
import type { FC } from 'react';

type Props = {
  value: number;
  label: string;
};

export const CountdownTimeUnit: FC<Props> = ({ value, label }) => (
  <VStack alignHorizontal="center" className={['min-w-[40px]']}>
    <Body size="2xl" className={['font-bold', 'text-orange-50', 'tabular-nums']}>
      {String(value).padStart(2, '0')}
    </Body>
    <Caption className={['text-[8px]', 'leading-none', 'text-orange-50', 'uppercase']}>{label}</Caption>
  </VStack>
);
