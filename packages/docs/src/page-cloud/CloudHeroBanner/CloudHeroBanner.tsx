import { Body, Button, Heading, HStack, Link, VStack } from '@app/ui-system';
import type { FC } from 'react';

export const CloudHeroBanner: FC<unknown> = () => (
  <VStack className={['gap-6', 'p-24', 'pt-64', 'bg-background', 'max-md:px-16']}>
    <Heading level={1} size="5xl" weight="extrabold">
      Skip the setup. Focus on building.
    </Heading>
    <Body size="2xl" className={['text-foreground']}>
      Build and ship with our cloud — everything you need is ready out of the box.
    </Body>
    <HStack className={['gap-8', 'mt-16']}>
      <Button variant="primary" size="lg" asChild={true}>
        <Link href="https://app.composify.cloud" target="_blank" plain={true}>
          Start free ›
        </Link>
      </Button>
      <Button variant="outline" size="lg" asChild={true}>
        <Link href="#setup" plain={true}>
          Request setup →
        </Link>
      </Button>
    </HStack>
  </VStack>
);
