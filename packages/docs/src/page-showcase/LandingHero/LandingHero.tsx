import { Body, Button, Caption, Heading, HStack, Link, VStack } from '@app/ui-system';
import type { FC } from 'react';

type Props = {
  tagline?: string;
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  centered: boolean;
};

export const LandingHero: FC<Props> = ({ tagline, title, description, primaryCta, secondaryCta, centered }) => (
  <VStack className={['gap-48', 'p-24', 'pt-64', 'pb-64', 'bg-violet-50', 'max-md:px-16']}>
    <VStack alignHorizontal={centered ? 'center' : 'start'} className={['gap-16', centered ? 'text-center' : '']}>
      {tagline && (
        <Caption className={['text-violet-600', 'font-semibold', 'tracking-wider', 'uppercase']}>{tagline}</Caption>
      )}
      <Heading level={1} size="5xl" weight="extrabold" align={centered ? 'center' : 'left'}>
        {title}
      </Heading>
      {description && (
        <Body size="xl" align={centered ? 'center' : 'left'} className={['text-foreground', 'max-w-xl']}>
          {description}
        </Body>
      )}
      <HStack className={['gap-8', 'mt-8']}>
        <Button variant="primary" size="lg" className={['bg-violet-600', 'hover:bg-violet-700']} asChild={true}>
          <Link href={primaryCta.href} plain={true}>
            {primaryCta.label}
          </Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className={['border-violet-300', 'bg-white', 'text-violet-600', 'hover:bg-violet-100']}
          asChild={true}
        >
          <Link href={secondaryCta.href} plain={true}>
            {secondaryCta.label}
          </Link>
        </Button>
      </HStack>
    </VStack>
  </VStack>
);
