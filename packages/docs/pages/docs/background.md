# Background [Why we built this?]

A few years back, I co-founded an edtech company. Like most startups, we ran all kinds of promotions every month, which meant our team was constantly building one-off campaign pages.

Over time, we started to notice patterns — certain page layouts and component combos that worked well. We'd reuse them over and over, just with different styles. Basically, we were playing with "building blocks" made from our existing components... but doing it manually was tedious, repetitive, and honestly, kind of draining.

We wanted a more scalable way to do this, so we looked around and found [Blocks UI](https://blocks-ui.com), a JSX-based visual editor.It was a promising concept and a great fit for our stack, but it wasn't fully built out and had a few limitations. So we rolled up our sleeves and built our own editor and renderer from scratch.

Fast-forward two years: it became one of the most-used tools in the company. Every marketing campaign ran through it. It powered product experiments. It even handled 60% of all incoming traffic — and kept growing.

After I moved on to other projects and companies, I realized something: a lot of teams actually need a WYSIWYG editor that works with their own components. They just don't know it yet. And like me back then, they don't want a tool that forces rewrites or adds complex APIs — especially in a large, established codebase.

I looked around again. Still nothing that fit. So we built one.

Composify started from a small, specific use case, but it turns out that's just scratching the surface of what Server-Driven UI and visual component editors can do.

In fact, most big tech companies already have their own in-house SDUI platforms:

- Airbnb has [Ghost Platform](https://medium.com/airbnb-engineering/a-deep-dive-into-airbnbs-server-driven-ui-system-842244c5f5).
- Yelp built [CHAOS](https://engineeringblog.yelp.com/2024/03/chaos-yelps-unified-framework-for-server-driven-ui.html?utm_source=chatgpt.com).
- Lyft developed [their own system](https://eng.lyft.com/the-journey-to-server-driven-ui-at-lyft-bikes-and-scooters-c19264a0378e).
- Shopify powers their Shop App [using SDUI](https://shopify.engineering/server-driven-ui-in-shop-app).

If you don't have the resources to build something like that from scratch — but want the same level of flexibility and power — Composify might be what you're looking for. 

Want to see what's possible with SDUI and visual editing? [Check out the use cases →](/docs/use-cases/instant-ui-updates)
