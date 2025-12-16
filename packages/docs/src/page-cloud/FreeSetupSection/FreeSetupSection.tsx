import { ButtonCta } from '@app/parcel-landing';
import { Body, Heading, VStack } from '@app/ui-system';
import type { FC } from 'react';

export const FreeSetupSection: FC<unknown> = () => (
  <VStack
    id="setup"
    alignHorizontal="center"
    className={[
      'gap-40',
      'bg-background-variant/70',
      'mx-24',
      'max-md:mx-16',
      'my-56',
      'max-md:my-48',
      'px-16',
      'py-196',
      'max-md:py-128',
      'border',
      'shadow-sm',
      'rounded-sm',
    ]}
  >
    <VStack className={['gap-8']}>
      <Heading level={2} size="4xl" weight="bold" align="center" className={['max-md:text-3xl']}>
        Let us set it up for you.
      </Heading>
      <Body size="xl" align="center" className={['max-w-[400px]', 'text-foreground', 'max-md:text-lg']}>
        We'll set up Composify in your repo, <span className="text-primary">for free</span>. Try it out. If it's not for
        you, just close the PR.
      </Body>
    </VStack>
    <ButtonCta
      variant="primary"
      size="xl"
      href="https://github.com/apps/composify-cloud-setup-assistant/installations/select_target"
      target="_blank"
    >
      Request free setup ›
    </ButtonCta>
  </VStack>
);
