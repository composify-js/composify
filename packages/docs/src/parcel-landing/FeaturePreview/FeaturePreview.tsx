import { VStack } from '@app/ui-system';
import type { FC, PropsWithChildren } from 'react';

export const FeaturePreview: FC<PropsWithChildren> = ({ children }) => (
  <VStack
    className={[
      'mx-32',
      'border',
      'border-b-0',
      'rounded-t-md',
      'bg-background-variant',
      'aspect-2/1',
      'overflow-hidden',
    ]}
  >
    {children}
  </VStack>
);
