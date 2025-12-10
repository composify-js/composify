import { posts } from 'virtual:blog';
import { Grid } from '@app/ui-system';
import { PostItem } from '../PostItem';

export const PostList = () => (
  <Grid columns={1} className={['gap-24', 'md:grid-cols-2', 'lg:grid-cols-3']}>
    {posts.map((post) => (
      <PostItem key={post.path} item={post} />
    ))}
  </Grid>
);
