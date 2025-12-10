import { Body, Grid, Heading, VStack } from '@app/ui-system';
import type { FC } from 'react';
import { CloudFeatureItem } from '../CloudFeatureItem';

export const CloudFeatureGroup: FC<unknown> = () => (
  <VStack
    id="features"
    className={['px-24', 'pt-64', 'pb-24', 'gap-0', 'bg-background', 'max-md:px-16', 'max-md:pt-48']}
  >
    <Heading level={2} size="4xl" className={['tracking-tight']}>
      Supercharge your editor.
    </Heading>
    <Body size="xl" className={['text-foreground', 'mt-8', 'mb-48']}>
      Start building in seconds. Get features that make your team faster.
    </Body>
    <Grid columns={2} className={['gap-24', 'max-md:grid-cols-1']}>
      <CloudFeatureItem
        emoji="🌐"
        title="Managed hosting, unlimited bandwidth"
        description="We take care of deployment, scaling, and infrastructure — with unlimited bandwidth, so traffic spikes are never a concern."
      />
      <CloudFeatureItem
        emoji="🙌"
        title="Real-time collaboration"
        description="Work together in the same editor, see updates instantly, and avoid merge conflicts. Collaboration that actually feels seamless."
        planned={true}
      />
      <CloudFeatureItem
        emoji="⏳"
        title="Version history that actually helps"
        description="Broke something? Roll back in one click. Want to see what changed last week? It's all there, searchable and instant."
        planned={true}
      />
      <CloudFeatureItem
        emoji="💳"
        title="Free to start, simple to scale"
        description="Straightforward pricing based on the number of pages and team members. No hidden fees or surprise charges."
      />
    </Grid>
  </VStack>
);
