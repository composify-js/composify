import '@app/parcel-landing/catalog';

import { VStack } from '@app/ui-system';
import { Example } from './Example';
import { ShowcaseHeroBanner } from './ShowcaseHeroBanner';

const PROMOTION_SOURCE = `
<VStack className={['bg-white']}>
  <VStack className={['p-16', 'bg-orange-500', 'text-white']}>
    <HStack alignHorizontal="center" alignVertical="center" className={['gap-16']}>
      <Body size="sm" className={['font-medium', 'text-secondary-foreground']}>Holiday Sale: Up to 30% off selected items!</Body>
    </HStack>
  </VStack>
  <VStack className={['p-24', 'py-48', 'max-md:px-16']}>
    <HStack className={['gap-48', 'items-center', 'max-md:flex-col']}>
      <VStack className={['flex-1', 'gap-16']}>
        <Caption className={['text-orange-500', 'font-semibold', 'tracking-wide', 'uppercase']}>
          Holiday Collection
        </Caption>
        <Heading level={1} size="5xl" weight="extrabold">
          Gifts they'll love
        </Heading>
        <Body size="lg" className={['text-foreground', 'max-w-md']}>
          Discover our curated selection of premium tech gifts. Free shipping on orders over $50.
        </Body>
        <HStack className={['gap-12', 'mt-8']}>
          <Link href="#" plain={true} className={['inline-flex', 'items-center', 'justify-center', 'px-24', 'py-12', 'rounded-sm', 'font-medium', 'bg-orange-500', 'text-white', 'hover:bg-orange-600']}>Shop now</Link>
          <Link href="#" plain={true} className={['inline-flex', 'items-center', 'justify-center', 'px-24', 'py-12', 'rounded-sm', 'font-medium', 'border', 'border-neutral-300', 'text-foreground', 'hover:bg-neutral-50']}>View all deals</Link>
        </HStack>
      </VStack>
      <Image src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&h=500&fit=crop" alt="Holiday gifts" className="flex-1 rounded-lg max-w-md" />
    </HStack>
  </VStack>
  <VStack className={['gap-32', 'p-24', 'pt-36', 'bg-neutral-50', 'max-md:px-16']}>
    <HStack alignVertical="center" alignHorizontal="between">
      <Heading level={2} size="2xl" weight="bold">
        Featured Products
      </Heading>
      <Link href="#" plain={true} className={['text-sm', 'font-medium', 'text-orange-500', 'hover:text-orange-600']}>View all →</Link>
    </HStack>
    <Grid columns={4} className={['gap-24', 'max-md:grid-cols-2']}>
      <VStack className={['gap-16', 'group']}>
        <VStack className={['bg-white', 'rounded-lg', 'border', 'overflow-hidden', 'aspect-square', 'items-center', 'justify-center']}>
          <Image src="https://images.unsplash.com/photo-1624258919367-5dc28f5dc293?w=600&h=600&fit=crop" alt="AirPods Pro" className="w-full h-full object-contain" />
        </VStack>
        <VStack className={['gap-4']}>
          <Caption className={['text-neutral-500']}>Audio</Caption>
          <Body className={['font-medium']}>AirPods Pro</Body>
          <HStack className={['gap-8', 'items-center']}>
            <Body className={['font-bold', 'text-orange-500']}>$199</Body>
            <Body size="sm" className={['text-neutral-400', 'line-through']}>$249</Body>
          </HStack>
        </VStack>
      </VStack>
      <VStack className={['gap-16', 'group']}>
        <VStack className={['bg-white', 'rounded-lg', 'border', 'overflow-hidden', 'aspect-square', 'items-center', 'justify-center']}>
          <Image src="https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?w=600&h=600&fit=crop" alt="Apple Watch" className="w-full h-full object-contain" />
        </VStack>
        <VStack className={['gap-4']}>
          <Caption className={['text-neutral-500']}>Wearables</Caption>
          <Body className={['font-medium']}>Apple Watch Series 9</Body>
          <HStack className={['gap-8', 'items-center']}>
            <Body className={['font-bold', 'text-orange-500']}>$299</Body>
            <Body size="sm" className={['text-neutral-400', 'line-through']}>$399</Body>
          </HStack>
        </VStack>
      </VStack>
      <VStack className={['gap-16', 'group']}>
        <VStack className={['bg-white', 'rounded-lg', 'border', 'overflow-hidden', 'aspect-square', 'items-center', 'justify-center']}>
          <Image src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop" alt="iPad Pro" className="w-full h-full object-contain" />
        </VStack>
        <VStack className={['gap-4']}>
          <Caption className={['text-neutral-500']}>Tablets</Caption>
          <Body className={['font-medium']}>iPad Pro 12.9"</Body>
          <HStack className={['gap-8', 'items-center']}>
            <Body className={['font-bold', 'text-orange-500']}>$999</Body>
            <Body size="sm" className={['text-neutral-400', 'line-through']}>$1,199</Body>
          </HStack>
        </VStack>
      </VStack>
      <VStack className={['gap-16', 'group']}>
        <VStack className={['bg-white', 'rounded-lg', 'border', 'overflow-hidden', 'aspect-square', 'items-center', 'justify-center']}>
          <Image src="https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=600&h=600&fit=crop" alt="iMac" className="w-full h-full object-contain" />
        </VStack>
        <VStack className={['gap-4']}>
          <Caption className={['text-neutral-500']}>Desktop</Caption>
          <Body className={['font-medium']}>iMac 24"</Body>
          <HStack className={['gap-8', 'items-center']}>
            <Body className={['font-bold', 'text-orange-500']}>$1,049</Body>
            <Body size="sm" className={['text-neutral-400', 'line-through']}>$1,499</Body>
          </HStack>
        </VStack>
      </VStack>
    </Grid>
  </VStack>
</VStack>`.trim();

const LANDING_SOURCE = `
<VStack className={['bg-violet-50']}>
  <VStack className={['gap-48', 'p-24', 'pt-64', 'pb-64', 'max-md:px-16']}>
    <VStack alignHorizontal="center" className={['gap-16', 'text-center']}>
      <Caption className={['text-violet-600', 'font-semibold', 'tracking-wider', 'uppercase']}>
        Analytics Platform
      </Caption>
      <Heading level={1} size="5xl" weight="extrabold" align="center">
        Understand your users like never before
      </Heading>
      <Body size="xl" align="center" className={['text-foreground', 'max-w-pred']}>
        Real-time analytics that help you make data-driven decisions.
        <br />
        Track user behavior, measure conversions, and optimize your product.
      </Body>
      <HStack className={['gap-8', 'mt-8']}>
        <Link href="#" plain={true} className={['inline-flex', 'items-center', 'justify-center', 'px-24', 'py-12', 'rounded-sm', 'font-medium', 'bg-violet-600', 'text-white', 'hover:bg-violet-700']}>Start free trial ›</Link>
        <Link href="#" plain={true} className={['inline-flex', 'items-center', 'justify-center', 'px-24', 'py-12', 'rounded-sm', 'font-medium', 'border', 'border-violet-300', 'bg-white', 'text-violet-600', 'hover:bg-violet-100']}>Book a demo →</Link>
      </HStack>
    </VStack>
  </VStack>
  <VStack className={['gap-48', 'p-24', 'pt-48', 'bg-white', 'max-md:px-16']}>
    <VStack alignHorizontal="center" className={['gap-8', 'text-center']}>
      <Heading level={2} size="4xl" weight="bold" align="center">
        Everything you need to grow
      </Heading>
      <Body size="lg" align="center" className={['text-foreground', 'max-w-pred']}>
        Powerful features that help you understand, engage, and retain your users.
      </Body>
    </VStack>
    <Grid columns={3} className={['gap-16', 'max-md:grid-cols-1']}>
      <VStack className={['gap-12', 'p-24', 'rounded-sm', 'border', 'border-violet-200']}>
        <VStack className={['w-48', 'h-48', 'rounded-sm', 'bg-violet-100', 'items-center', 'justify-center']}>
          <Body className={['text-violet-600', 'text-2xl']}>📊</Body>
        </VStack>
        <VStack className={['gap-8']}>
          <Heading level={3} size="xl" weight="semibold">
            Real-time Dashboard
          </Heading>
          <Body className={['text-foreground']}>
            Monitor your metrics as they happen. No more waiting for batch updates.
          </Body>
        </VStack>
      </VStack>
      <VStack className={['gap-12', 'p-24', 'rounded-sm', 'border', 'border-violet-200']}>
        <VStack className={['w-48', 'h-48', 'rounded-sm', 'bg-violet-100', 'items-center', 'justify-center']}>
          <Body className={['text-violet-600', 'text-2xl']}>🔍</Body>
        </VStack>
        <VStack className={['gap-8']}>
          <Heading level={3} size="xl" weight="semibold">
            Funnel Analysis
          </Heading>
          <Body className={['text-foreground']}>
            Identify drop-off points and optimize your conversion flow.
          </Body>
        </VStack>
      </VStack>
      <VStack className={['gap-12', 'p-24', 'rounded-sm', 'border', 'border-violet-200']}>
        <VStack className={['w-48', 'h-48', 'rounded-sm', 'bg-violet-100', 'items-center', 'justify-center']}>
          <Body className={['text-violet-600', 'text-2xl']}>📈</Body>
        </VStack>
        <VStack className={['gap-8']}>
          <Heading level={3} size="xl" weight="semibold">
            Custom Reports
          </Heading>
          <Body className={['text-foreground']}>
            Build and share reports tailored to your team's needs.
          </Body>
        </VStack>
      </VStack>
    </Grid>
  </VStack>
</VStack>`.trim();

const PROTOTYPING_SOURCE = `
<VStack className={['gap-24', 'p-24', 'bg-background', 'max-md:px-16']}>
  <HStack alignVertical="center" className={['gap-8']}>
    <Caption className={['px-8', 'py-4', 'bg-red-100', 'text-red-800', 'rounded-sm', 'font-medium']}>
      Beta
    </Caption>
    <Caption className={['text-foreground']}>
      We're testing a new feature
    </Caption>
  </HStack>
  <VStack className={['gap-12']}>
    <Heading level={2} size="3xl" weight="bold">
      Try our new AI assistant
    </Heading>
    <Body size="lg" className={['text-foreground', 'max-w-pred']}>
      We've been working on an AI-powered assistant to help you analyze your data faster. It's still in beta, but we'd love your feedback.
    </Body>
  </VStack>
  <VStack className={['gap-16', 'p-24', 'rounded-sm', 'border', 'border-dashed']}>
    <Body className={['text-foreground']}>
      "Show me the top 10 countries by revenue this month"
    </Body>
    <VStack className={['gap-8', 'p-16', 'bg-muted', 'rounded-sm']}>
      <Caption className={['text-foreground', 'font-medium']}>
        AI Response Preview
      </Caption>
      <Body size="sm" className={['text-foreground', 'opacity-70']}>
        Here's a breakdown of your top 10 countries by revenue for November 2024...
      </Body>
    </VStack>
  </VStack>
  <HStack className={['gap-8']}>
    <Link href="#" plain={true} className={['inline-flex', 'items-center', 'justify-center', 'px-16', 'py-8', 'rounded-sm', 'font-medium', 'bg-red-500', 'text-white', 'hover:bg-red-600']}>Try it now ›</Link>
    <Link href="#" plain={true} className={['inline-flex', 'items-center', 'justify-center', 'px-16', 'py-8', 'rounded-sm', 'font-medium', 'border', 'text-foreground', 'hover:bg-muted']}>Give feedback →</Link>
  </HStack>
</VStack>`.trim();

const CONTENTS_SOURCE = `
<VStack className={['gap-24', 'p-24', 'bg-background', 'max-md:px-16']}>
  <VStack className={['gap-8']}>
    <Heading level={2} size="3xl" weight="bold">
      From the blog
    </Heading>
    <Body size="lg" className={['text-foreground']}>
      Insights on product analytics, growth, and building better products.
    </Body>
  </VStack>
  <Grid columns={2} className={['gap-24', 'max-md:grid-cols-1']}>
    <VStack className={['gap-12', 'p-24', 'rounded-sm', 'border']}>
      <Caption className={['text-foreground', 'opacity-60']}>
        Dec 10, 2024 • 5 min read
      </Caption>
      <VStack className={['gap-8']}>
        <Heading level={3} size="xl" weight="semibold">
          How to reduce churn with cohort analysis
        </Heading>
        <Body className={['text-foreground']}>
          Learn how leading SaaS companies use cohort analysis to identify at-risk users before they leave.
        </Body>
      </VStack>
      <Link href="#" plain={true} className={['inline-flex', 'items-center', 'justify-center', 'px-12', 'py-6', 'rounded-sm', 'text-sm', 'font-medium', 'bg-muted', 'text-foreground', 'hover:bg-muted/80']}>Read more →</Link>
    </VStack>
    <VStack className={['gap-12', 'p-24', 'rounded-sm', 'border']}>
      <Caption className={['text-foreground', 'opacity-60']}>
        Dec 5, 2024 • 8 min read
      </Caption>
      <VStack className={['gap-8']}>
        <Heading level={3} size="xl" weight="semibold">
          The metrics that actually matter for growth
        </Heading>
        <Body className={['text-foreground']}>
          Stop tracking vanity metrics. Here are the numbers that successful teams obsess over.
        </Body>
      </VStack>
      <Link href="#" plain={true} className={['inline-flex', 'items-center', 'justify-center', 'px-12', 'py-6', 'rounded-sm', 'text-sm', 'font-medium', 'bg-muted', 'text-foreground', 'hover:bg-muted/80']}>Read more →</Link>
    </VStack>
  </Grid>
</VStack>`.trim();

const ARTICLE_SOURCE = `
<VStack className={['gap-32', 'p-24', 'pt-48', 'bg-background', 'max-md:px-16']}>
  <VStack alignHorizontal="center" className={['gap-16', 'max-w-[720px]', 'mx-auto']}>
    <Caption className={['text-foreground', 'opacity-60']}>
      Dec 10, 2024 • 5 min read
    </Caption>
    <Heading level={1} size="4xl" weight="bold" align="center">
      How to reduce churn with cohort analysis
    </Heading>
    <Body size="lg" align="center" className={['text-foreground']}>
      Learn how leading SaaS companies use cohort analysis to identify at-risk users before they leave.
    </Body>
  </VStack>
  <VStack className={['gap-24', 'max-w-[720px]', 'mx-auto']}>
    <Body size="lg" className={['text-foreground']}>
      Cohort analysis is one of the most powerful tools for understanding user behavior over time. Instead of looking at all users as one group, you segment them based on when they signed up or performed a specific action.
    </Body>
    <VStack className={['gap-12']}>
      <Heading level={2} size="2xl" weight="semibold">
        Why cohort analysis matters
      </Heading>
      <Body className={['text-foreground']}>
        Traditional metrics like daily active users can be misleading. A growing user base might mask a retention problem. Cohort analysis reveals patterns that aggregate metrics hide, showing you exactly when and why users leave.
      </Body>
    </VStack>
    <VStack className={['gap-12']}>
      <Heading level={2} size="2xl" weight="semibold">
        Getting started
      </Heading>
      <Body className={['text-foreground']}>
        Start by defining your cohorts. The most common approach is to group users by their signup week or month. Then track a key metric like "logged in" or "completed purchase" over time for each cohort.
      </Body>
    </VStack>
    <VStack className={['p-24', 'bg-muted', 'rounded-sm', 'gap-8']}>
      <Caption className={['text-foreground', 'font-semibold']}>
        Key takeaway
      </Caption>
      <Body className={['text-foreground']}>
        Focus on the shape of your retention curve, not just the numbers. A curve that flattens after week 4 suggests strong product-market fit for users who make it past onboarding.
      </Body>
    </VStack>
  </VStack>
</VStack>`.trim();

export const ShowcasePage = () => (
  <VStack>
    <ShowcaseHeroBanner />
    <Example id="promotion" name="A promotion page with countdown and product grid" source={PROMOTION_SOURCE} />
    <Example id="landing" name="A landing page with hero, features and CTA" source={LANDING_SOURCE} />
    <Example id="prototyping" name="A beta announcement with preview and feedback" source={PROTOTYPING_SOURCE} />
    <Example id="contents" name="A blog listing with article cards" source={CONTENTS_SOURCE} />
    <Example id="article" name="A blog article with headings and callout" source={ARTICLE_SOURCE} />
  </VStack>
);
