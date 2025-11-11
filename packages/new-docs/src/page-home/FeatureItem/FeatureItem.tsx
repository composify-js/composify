import { VStack } from '@app/ui-system';
import type { FC, PropsWithChildren } from 'react';

export const FeatureItem: FC<PropsWithChildren> = ({ children }) => (
  <VStack
    className={[
      'mx-32',
      'p-16',
      'border',
      'border-b-0',
      'rounded-t-md',
      'text-[13px]',
      'bg-background-variant',
      'aspect-2/1',
      'overflow-hidden',
      '[&_*]:!bg-transparent',
      '[&_*]:outline-none',
      '[&_*]:border-none',
    ]}
  >
    {children}
  </VStack>
);
