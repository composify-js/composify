import { Body, Heading, VStack } from '@app/ui-system';
import type { FC } from 'react';

type Props = {
  icon?: string;
  title: string;
  description: string;
};

export const LandingFeatureCard: FC<Props> = ({ icon, title, description }) => (
  <VStack className={['gap-12', 'p-24', 'rounded-sm', 'border', 'border-violet-200']}>
    {icon && (
      <VStack className={['w-48', 'h-48', 'rounded-sm', 'bg-violet-100', 'items-center', 'justify-center']}>
        <Body className={['text-violet-600', 'text-2xl']}>{icon}</Body>
      </VStack>
    )}
    <VStack className={['gap-8']}>
      <Heading level={3} size="xl" weight="semibold">
        {title}
      </Heading>
      <Body className={['text-foreground']}>{description}</Body>
    </VStack>
  </VStack>
);
