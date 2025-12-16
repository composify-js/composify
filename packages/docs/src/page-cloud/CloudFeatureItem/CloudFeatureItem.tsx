import { Badge, Body, Heading, VStack } from '@app/ui-system';
import type { FC } from 'react';

type Props = {
  emoji: string;
  title: string;
  description: string;
  planned?: boolean;
};

export const CloudFeatureItem: FC<Props> = ({ emoji, title, description, planned }) => (
  <VStack
    className={['relative', 'p-24', 'max-md:p-20', 'items-start', 'rounded-sm', 'border', 'bg-background-variant']}
  >
    {planned && <Badge className={['absolute', 'top-16', 'right-16']}>Coming soon!</Badge>}
    <VStack alignHorizontal="center" className={['p-8', 'rounded-sm', 'border', 'bg-muted', 'aspect-square']}>
      <Body size="3xl">{emoji}</Body>
    </VStack>
    <Heading level={3} size="xl" weight="semibold" className={['mt-18', 'mb-6']}>
      {title}
    </Heading>
    <Body size="md">{description}</Body>
  </VStack>
);
