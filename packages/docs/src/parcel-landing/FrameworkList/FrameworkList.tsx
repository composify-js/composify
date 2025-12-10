import { VStack } from '@app/ui-system';
import type { FC } from 'react';
import { FrameworkItem } from '../FrameworkItem';

export const FrameworkList: FC<unknown> = () => (
  <VStack className={['m-auto', 'p-16', 'overflow-hidden']}>
    <VStack className={['p-4', 'border', 'rounded-lg', 'bg-background']}>
      <FrameworkItem icon="/assets/framework-next.svg" name="Next.js" selected={true} />
      <FrameworkItem icon="/assets/framework-expo.svg" name="Expo" />
      <FrameworkItem icon="/assets/framework-react-router.svg" name="React Router" />
      <FrameworkItem icon="/assets/framework-tanstack.png" name="Tanstack Router" />
    </VStack>
  </VStack>
);
