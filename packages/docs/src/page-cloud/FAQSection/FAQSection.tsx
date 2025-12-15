import { Accordion, Body, Heading, VStack } from '@app/ui-system';
import type { FC } from 'react';

export const FAQSection: FC<unknown> = () => (
  <VStack id="faq" className={['p-24', 'pt-88', 'gap-48', 'bg-background', 'max-md:p-16', 'max-md:pt-64']}>
    <VStack className={['gap-8']}>
      <Heading level={2} size="4xl">
        FAQ
      </Heading>
      <Body size="xl" className={['text-foreground']}>
        Commonly asked questions about Composify Cloud.
      </Body>
    </VStack>
    <VStack className={['border', 'px-24', 'py-4', 'rounded-sm']}>
      <Accordion summary="How is Composify Cloud different from the open-source version?">
        The core editor and renderer are identical. Cloud adds managed hosting, real-time collaboration, and version
        history, so you don't have to build that infrastructure yourself.
      </Accordion>
      <Accordion summary="Can I start for free?">
        Yes. The free tier includes 1 page and 1 member with unlimited bandwidth. No credit card required.
      </Accordion>
      <Accordion summary="What happens if I exceed my plan limits?">
        You can add more pages ($1 per page) or members ($5 per member) anytime.
      </Accordion>
      <Accordion summary="Do I need to rewrite my existing components?">
        No. Composify works with your components as they are. You register them in a separate catalog file, and they
        become instantly editable. Your original code stays untouched.
      </Accordion>
      <Accordion summary="Where is my data stored?">
        Pages are stored in our managed cloud infrastructure. We handle storage, backups, and delivery. Your content is
        served via CDN with unlimited bandwidth, so traffic spikes won't slow you down.
      </Accordion>
      <Accordion summary="Can I export my data?">
        Everything is stored as standard JSX strings. You can fetch your content anytime via our API and migrate to
        self-hosted if you ever want to leave.
      </Accordion>
      <Accordion summary="What frameworks are supported?">
        Anything that runs React. Next.js, Remix, React Router, Expo — if it renders React components, Composify works.
        Vue support is on the roadmap.
      </Accordion>
      <Accordion summary="Can non-developers use it?">
        That's the point. Engineers build and register components. Everyone else (marketers, designers, content editors)
        uses the visual editor to build pages without touching code.
      </Accordion>
      <Accordion summary="How does this compare to Builder.io or Puck?">
        Most visual editors store data as JSON and require you to adapt your components. Composify stores JSX directly
        and works with your existing code without rewrites.
      </Accordion>
      <Accordion summary="What's coming next?">
        Real-time collaboration and version history with time-travel are on the roadmap. Both will be included in Pro
        and Business plans at no extra cost.
      </Accordion>
    </VStack>
  </VStack>
);
