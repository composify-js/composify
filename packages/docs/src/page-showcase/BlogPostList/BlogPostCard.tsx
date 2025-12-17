import { Body, Button, Caption, Heading, Link, VStack } from '@app/ui-system';
import type { FC } from 'react';

export type Props = {
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  href: string;
};

export const BlogPostCard: FC<Props> = ({ date, readTime, title, excerpt, href }) => (
  <VStack className={['gap-12', 'p-24', 'rounded-sm', 'border']}>
    <Caption className={['text-foreground', 'opacity-60']}>
      {date} • {readTime}
    </Caption>
    <VStack className={['gap-8']}>
      <Heading level={3} size="xl" weight="semibold">
        {title}
      </Heading>
      <Body className={['text-foreground']}>{excerpt}</Body>
    </VStack>
    <Button variant="secondary" size="lg" asChild={true}>
      <Link href={href} plain={true}>
        Read more →
      </Link>
    </Button>
  </VStack>
);
