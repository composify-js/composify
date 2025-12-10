import { Body, Caption, Heading, Link, VStack } from '@app/ui-system';
import type { FC } from 'react';

type Props = {
  item: {
    path: string;
    title: string;
    description: string;
    authors?: string | string[];
    date?: string;
  };
};

export const PostItem: FC<Props> = ({ item }) => (
  <Link href={item.path} plain={true}>
    <VStack className={['p-24', 'gap-16', 'border', 'rounded-md', 'transition-colors', 'hover:bg-background-variant']}>
      <Caption>{item.date}</Caption>
      <Heading level={2} size="2xl">
        {item.title}
      </Heading>
      <Body size="md" className={['line-clamp-3']}>
        {item.description}
      </Body>
    </VStack>
  </Link>
);
