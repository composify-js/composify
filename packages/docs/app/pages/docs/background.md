# Background [Why we built this?]

A few years back, I co-founded an edtech company. Like most startups, we ran promotions constantly, which meant building one-off campaign pages every single month.

Over time, we noticed patterns. Certain layouts and component combinations worked well. We'd reuse them with different styles. Basically, we were playing with "building blocks" made from our existing design system, but doing it manually in code was tedious and repetitive. The engineering team became a bottleneck for marketing content.

We needed something more scalable. We found [Blocks UI](https://blocks-ui.com), a JSX-based visual editor. Promising concept, good fit for our stack, but it wasn't fully built out. So we built our own editor and renderer.

Fast-forward two years: that internal tool became one of the most-used applications in the company. Every marketing campaign ran through it. It powered product experiments. It eventually handled 60% of all incoming traffic.

## The Gap in the Market

After moving on to other companies, I realized this wasn't a unique problem. Many teams need a visual editor that:

1. Works with their **existing** components.
2. Doesn't require a massive rewrite to implement.

Most "no-code" tools force you to abandon your code and build in their silo. 

More importantly, most "headless CMS" or visual builders require you to rewrite or adapt your components to fit their proprietary SDKs. You might need to refactor how they handle children, or map props to a specific JSON schema.

For a small project, this might be manageable. But for established teams with hundreds of production components, refactoring a working library just to enable visual editing is a non-starter. The migration cost is simply too high.

I looked around for a solution. Nothing fit. So we built Composify.

## Server-Driven UI (SDUI)

Composify is essentially a democratized version of Server-Driven UI. This architecture is how the giants move fast:

- Airbnb has [Ghost Platform](https://medium.com/airbnb-engineering/a-deep-dive-into-airbnbs-server-driven-ui-system-842244c5f5)
- Yelp built [CHAOS](https://engineeringblog.yelp.com/2024/03/chaos-yelps-unified-framework-for-server-driven-ui.html?utm_source=chatgpt.com)
- Lyft developed [their own mobile SDUI system](https://eng.lyft.com/the-journey-to-server-driven-ui-at-lyft-bikes-and-scooters-c19264a0378e)
- Shopify powers their Shop App [using SDUI](https://shopify.engineering/server-driven-ui-in-shop-app)

These companies built proprietary engines to let their servers decide what the client renders. Composify gives you that same power. It allows you to update layouts instantly without app deployments.

Want to see what's possible with SDUI and visual editing? [Check out the use cases →](/docs/use-cases/instant-ui-updates)

## Why Cloud?

While the open-source library gives you the engine (the Editor and Renderer), building the car (database, API, version history, collaboration) takes time.

That's why we introduced [Composify Cloud](/cloud). It's the infrastructure layer for teams that want the benefits of Composify without maintaining the backend plumbing. You register your components in your code, and we handle the storage, real-time collaboration, and content delivery.
