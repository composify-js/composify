import { Body, Caption, Heading, VStack } from '@app/ui-system';
import type { FC } from 'react';

type Props = {
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
};

export const ArticleHeader: FC<Props> = ({ date, readTime, title, excerpt }) => (
  <VStack alignHorizontal="center" className={['gap-16', 'max-w-[720px]', 'mx-auto']}>
    <Caption className={['text-foreground', 'opacity-60']}>{[date, readTime].join(' • ')}</Caption>
    <Heading level={1} size="4xl" weight="bold" align="center">
      {title}
    </Heading>
    <Body size="lg" align="center" className={['text-foreground']}>
      {excerpt}
    </Body>
  </VStack>
);
