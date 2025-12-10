import { Body, Caption, Heading, HStack, VStack } from '@app/ui-system';
import type { FC } from 'react';

type Feature = {
  label: string;
  caption?: string;
  planned?: boolean;
};

type Props = {
  title: string;
  description: string;
  price: string;
  interval: string;
  features: Feature[];
  recommended?: boolean;
};

const CheckIcon: FC<{ planned?: boolean }> = ({ planned }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={planned ? 'fill-foreground-variant opacity-60' : 'fill-primary'}
    width={14}
    height={14}
    viewBox="0 0 512 512"
  >
    <title>{planned ? 'Planned' : 'Available'}</title>
    <path d="M256 512a256 256 0 1 0 0-512 256 256 0 1 0 0 512zm84.4-299.3l-80 128c-4.2 6.7-11.4 10.9-19.3 11.3s-15.5-3.2-20.2-9.6l-48-64c-8-10.6-5.8-25.6 4.8-33.6s25.6-5.8 33.6 4.8l27 36 61.4-98.3c7-11.2 21.8-14.7 33.1-7.6s14.7 21.8 7.6 33.1z" />
  </svg>
);

export const PlanItem: FC<Props> = ({ title, description, price, interval, features, recommended }) => (
  <VStack
    className={[
      'flex-1',
      'gap-12',
      'p-32',
      'max-lg:p-24',
      recommended ? 'border-x' : '',
      recommended ? 'max-lg:border-x-0' : '',
      recommended ? 'max-lg:border-y' : '',
    ]}
  >
    <VStack className={['gap-4']}>
      <Heading level={3} size="2xl">
        {title}
      </Heading>
      <Body size="md">{description}</Body>
    </VStack>
    <HStack alignVertical="end">
      <Heading level={3} size="3xl">
        {price}
      </Heading>
      <Body size="md" className={['mb-2']}>
        {interval}
      </Body>
    </HStack>
    <VStack className={[]}>
      {features.map((feature) => (
        <HStack key={feature.label} alignVertical="center" className={['h-26', 'gap-6']}>
          <CheckIcon planned={feature.planned} />
          <HStack alignVertical="center" className={['gap-4']}>
            <Body size="sm" className={['text-foreground']}>
              {feature.label}
            </Body>
            {feature.caption && <Caption className={['opacity-90']}>{feature.caption}</Caption>}
          </HStack>
        </HStack>
      ))}
    </VStack>
  </VStack>
);
