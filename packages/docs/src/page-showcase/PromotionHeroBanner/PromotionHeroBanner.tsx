import { Body, Button, Caption, Heading, HStack, Image, Link, VStack } from '@app/ui-system';
import type { FC } from 'react';

type Props = {
  tagline: string;
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
  imageSrc: string;
};

export const PromotionHeroBanner: FC<Props> = ({ tagline, title, description, primaryCta, secondaryCta, imageSrc }) => (
  <VStack className={['p-24', 'py-48', 'max-md:px-16']}>
    <HStack className={['gap-48', 'items-center', 'max-md:flex-col']}>
      <VStack className={['flex-1', 'gap-16']}>
        <Caption className={['text-orange-500', 'font-semibold', 'tracking-wide', 'uppercase']}>{tagline}</Caption>
        <Heading level={1} size="5xl" weight="extrabold">
          {title}
        </Heading>
        <Body size="lg" className={['text-foreground', 'max-w-md']}>
          {description}
        </Body>
        <HStack className={['gap-12', 'mt-8']}>
          <Button variant="primary" size="lg" className={['bg-orange-500', 'hover:bg-orange-600']} asChild={true}>
            <Link href={primaryCta.href} plain={true}>
              {primaryCta.label}
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild={true}>
            <Link href={secondaryCta.href} plain={true}>
              {secondaryCta.label}
            </Link>
          </Button>
        </HStack>
      </VStack>
      <Image src={imageSrc} alt={title} className="flex-1 rounded-lg max-w-md" />
    </HStack>
  </VStack>
);
