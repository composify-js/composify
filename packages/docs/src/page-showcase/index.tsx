import '@app/parcel-landing/catalog';
import './catalog';

import { VStack } from '@app/ui-system';
import { Example } from './Example';
import { ShowcaseHeroBanner } from './ShowcaseHeroBanner';

const PROMOTION_SOURCE = `
  <VStack className={['bg-white']}>
    <PromotionCountdown
      message="Holiday Sale: Up to 30% off selected items!"
      endDate="${new Date(Date.now() + (86400 * 1000) / 2).toISOString()}"
    />
    <PromotionHeroBanner
      tagline="Holiday Collection"
      title="Gifts they'll love"
      description="Discover our curated selection of premium tech gifts. Free shipping on orders over $50."
      primaryCta={{
        label: "Shop now",
        href: "#"
      }}
      secondaryCta={{
        label: "View all deals",
        href: "#"
      }}
      imageSrc="https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=600&h=500&fit=crop"
    />
    <PromotionProductGrid
      title="Featured Products"
      viewAll={{
        label: "View all →",
        href: "#"
      }}
      products={[
        { imageSrc: "https://images.unsplash.com/photo-1624258919367-5dc28f5dc293?w=600&h=600&fit=crop", category: "Audio", name: "AirPods Pro", price: "$199", originalPrice: "$249" },
        { imageSrc: "https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?w=600&h=600&fit=crop", category: "Wearables", name: "Apple Watch Series 9", price: "$299", originalPrice: "$399" },
        { imageSrc: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop", category: "Tablets", name: "iPad Pro 12.9", price: "$999", originalPrice: "$1,199" },
        { imageSrc: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=600&h=600&fit=crop", category: "Desktop", name: "iMac 24", price: "$1,049", originalPrice: "$1,499" }
      ]}
    />
  </VStack>
`.trim();

const LANDING_SOURCE = `
  <VStack className={['bg-violet-50']}>
    <LandingHero
      tagline="Analytics Platform"
      title="Understand your users like never before"
      description="Real-time analytics that help you make data-driven decisions. Track user behavior, measure conversions, and optimize your product."
      primaryCta={{
        label: "Start free trial ›",
        href: "#"
      }}
      secondaryCta={{
        label: "Book a demo →",
        href: "#"
      }}
      centered={true}
    />
    <VStack className={['gap-48', 'p-24', 'pt-48', 'bg-white', 'max-md:px-16']}>
      <VStack alignHorizontal="center" className={['gap-8', 'text-center']}>
        <Heading level={2} size="4xl" weight="bold" align="center">
          Everything you need to grow
        </Heading>
        <Body size="lg" align="center" className={['text-foreground']}>
          Powerful features that help you understand, engage, and retain your users.
        </Body>
      </VStack>
      <Grid columns={3} className={['gap-16', 'max-md:grid-cols-1']}>
        <LandingFeatureCard icon="📊" title="Real-time Dashboard" description="Monitor your metrics as they happen. No more waiting for batch updates." accentColor="violet" />
        <LandingFeatureCard icon="🔍" title="Funnel Analysis" description="Identify drop-off points and optimize your conversion flow." accentColor="violet" />
        <LandingFeatureCard icon="📈" title="Custom Reports" description="Build and share reports tailored to your team's needs." accentColor="violet" />
      </Grid>
    </VStack>
  </VStack>
`.trim();

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
  </VStack>
`.trim();

const CONTENTS_SOURCE = `
  <BlogPostList
    title="From the blog"
    description="Insights on product analytics, growth, and building better products."
    columns={2}
    posts={[
      {
        date: "Dec 10, 2024",
        readTime: "5 min read",
        title: "How to reduce churn with cohort analysis",
        excerpt: "Learn how leading SaaS companies use cohort analysis to identify at-risk users before they leave.",
        href: "#"
      },
      {
        date: "Dec 5, 2024",
        readTime: "8 min read",
        title: "The metrics that actually matter for growth",
        excerpt: "Stop tracking vanity metrics. Here are the numbers that successful teams obsess over.",
        href: "#"
      }
    ]}
  />
`.trim();

const ARTICLE_SOURCE = `
<VStack className={['gap-32', 'p-24', 'pt-48', 'bg-background', 'max-md:px-16']}>
  <ArticleHeader
    date="Dec 10, 2024"
    readTime="5 min read"
    title="How to reduce churn with cohort analysis"
    excerpt="Learn how leading SaaS companies use cohort analysis to identify at-risk users before they leave."
  />
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
