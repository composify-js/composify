import { Body, Button, Heading, HStack, Link, VStack } from '@app/ui-system';
import type { FC } from 'react';

export const ShowcaseHeroBanner: FC<unknown> = () => (
  <VStack className={['gap-6', 'p-24', 'pt-64', 'bg-background', 'max-md:px-16']}>
    <Heading level={1} size="5xl" weight="extrabold">
      See what you can build
    </Heading>
    <Body size="2xl" className={['text-foreground']}>
      Browse examples and discover what's possible with Server Driven UI.
    </Body>
    <HStack className={['gap-8', 'mt-16']}>
      <Button variant="primary" size="lg" asChild={true}>
        <Link href="#promotion" plain={true}>
          Start browsing ›
        </Link>
      </Button>
      <Button variant="outline" size="lg" asChild={true}>
        <Link href="/docs" plain={true}>
          View docs →
        </Link>
      </Button>
    </HStack>
  </VStack>
);
