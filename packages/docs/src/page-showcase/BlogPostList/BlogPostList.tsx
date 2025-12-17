import { Body, Grid, Heading, VStack } from '@app/ui-system';
import type { FC } from 'react';
import { BlogPostCard, type Props as BlogPostCardProps } from './BlogPostCard';

type Props = {
  title: string;
  description: string;
  columns: 1 | 2 | 3;
  posts: BlogPostCardProps[];
};

const columnClasses: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'max-md:grid-cols-1',
  3: 'max-md:grid-cols-1',
};

export const BlogPostList: FC<Props> = ({ title, description, columns, posts }) => (
  <VStack className={['gap-24', 'p-24', 'bg-background', 'max-md:px-16']}>
    <VStack className={['gap-8']}>
      <Heading level={2} size="3xl" weight="bold">
        {title}
      </Heading>
      <Body size="lg" className={['text-foreground']}>
        {description}
      </Body>
    </VStack>
    <Grid columns={columns} className={['gap-24', columnClasses[columns]]}>
      {posts.map((article) => (
        <BlogPostCard key={article.title} {...article} />
      ))}
    </Grid>
  </VStack>
);
