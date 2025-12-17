import { Body, HStack, VStack } from '@app/ui-system';
import type { FC } from 'react';
import { CountdownTimeUnit } from './CountdownTimeUnit';
import { useCountdown } from './useCountdown';

type Props = {
  message: string;
  endDate: string;
};

export const PromotionCountdown: FC<Props> = ({ message, endDate }) => {
  const timeLeft = useCountdown(endDate);

  return (
    <VStack className={['p-12', 'bg-orange-500', 'text-white']}>
      <HStack alignHorizontal="center" alignVertical="center" className={['gap-16', 'flex-wrap']}>
        <Body size="md" className={['font-medium', 'text-orange-50']}>
          {message}
        </Body>
        <HStack alignVertical="center" className={['gap-4']}>
          <CountdownTimeUnit value={timeLeft.days} label="days" />
          <Body className={['text-orange-50', 'text-lg']}>:</Body>
          <CountdownTimeUnit value={timeLeft.hours} label="hrs" />
          <Body className={['text-orange-50', 'text-lg']}>:</Body>
          <CountdownTimeUnit value={timeLeft.minutes} label="min" />
          <Body className={['text-orange-50', 'text-lg']}>:</Body>
          <CountdownTimeUnit value={timeLeft.seconds} label="sec" />
        </HStack>
      </HStack>
    </VStack>
  );
};
