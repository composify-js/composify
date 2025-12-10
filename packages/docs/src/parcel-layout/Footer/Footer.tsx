import { Caption, Heading, Image, Link, VStack } from '@app/ui-system';

export const Footer = () => (
  <VStack id="footer" className={['md:flex-row', 'md:gap-32', 'pt-32', 'border-t']}>
    <VStack className={['flex-1', 'mb-48', 'gap-8']}>
      <Image width={145} height={32} src="/brand/logo-light.svg" alt="Logo" loading="eager" fetchPriority="high" />
      <Caption className={['py-4']}>© {new Date().getFullYear()} Hills Inc.</Caption>
    </VStack>
    <VStack className={['flex-1', 'mb-48']}>
      <Heading level={4} size="lg" className={['mb-16', 'text-foreground']}>
        Docs
      </Heading>
      <Link href="/docs" className={['h-32', 'text-foreground-variant']}>
        Introduction
      </Link>
      <Link href="/docs/getting-started" className={['h-32', 'text-foreground-variant']}>
        Getting Started
      </Link>
      <Link href="/docs/tutorial/prerequisites" className={['h-32', 'text-foreground-variant']}>
        Tutorial
      </Link>
      <Link href="https://github.com/composify-js/composify" className={['h-32', 'text-foreground-variant']}>
        Github
      </Link>
    </VStack>
    <VStack className={['flex-1', 'mb-48']}>
      <Heading level={4} size="lg" className={['mb-16', 'text-foreground']}>
        Use Cases
      </Heading>
      <Link href="/docs/use-cases/ab-testing-and-prototyping" className={['h-32', 'text-foreground-variant']}>
        Faster Prototyping
      </Link>
      <Link href="/docs/use-cases/no-code-tools" className={['h-32', 'text-foreground-variant']}>
        No Code Tools
      </Link>
      <Link href="/docs/use-cases/instant-ui-updates" className={['h-32', 'text-foreground-variant']}>
        Instant UI updates
      </Link>
      <Link href="/docs/use-cases/headless-cms" className={['h-32', 'text-foreground-variant']}>
        Headless CMS
      </Link>
    </VStack>
    <VStack className={['flex-1', 'mb-48']}>
      <Heading level={4} size="lg" className={['mb-16', 'text-foreground']}>
        Cloud
      </Heading>
      <Link href="https://app.composify.cloud" className={['h-32', 'text-foreground-variant']}>
        Dashboard
      </Link>
      <Link href="https://app.composify.cloud/terms" className={['h-32', 'text-foreground-variant']}>
        Terms of Service
      </Link>
      <Link href="https://app.composify.cloud/privacy" className={['h-32', 'text-foreground-variant']}>
        Privacy Policy
      </Link>
      <Link href="mailto:support@composify.cloud" className={['h-32', 'text-foreground-variant']}>
        Contact
      </Link>
    </VStack>
  </VStack>
);
