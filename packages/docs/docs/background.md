---
sidebar_position: 2
---

# Background

A few years back, I co-founded an edtech company. Like most startups, we ran all kinds of promotions every month, which meant our team was constantly building one-off campaign pages. Over time, we started to see some common patterns—winning combinations we'd reuse again and again, just with different styles.

We realized we were basically playing with LEGO blocks, reassembling the same components over and over. It worked, but it was tedious, repetitive, and honestly, kind of draining.

We wanted a more scalable way to do this, so we looked around and found [Blocks UI](https://blocks-ui.com), a JSX-based visual editor. It was a promising concept and a great fit for our stack—but it wasn't fully built out and had some limitations. So we rolled up our sleeves and built our own editor and renderer from scratch.

Two years later, that internal tool became a core part of our company. Every single marketing campaign, product experiment, and dynamic content surface was built with it. At one point, it powered over 60% of all incoming traffic—and that number kept growing.

After leaving the company, I worked on several different teams across multiple companies—and I kept running into the same need: a WYSIWYG editor that works with _your_ components, without forcing a rewrite or a complex API. Something lightweight, flexible, and easy to plug into large existing codebases.

I looked around again. Still nothing that fit. So we built it.

Composify started from a small, specific use case, but it turns out that's just scratching the surface of what Server-Driven UI and visual component editors can do.

In fact, most big tech companies already have their own in-house SDUI platforms:

- Airbnb has [Ghost Platform](https://medium.com/airbnb-engineering/a-deep-dive-into-airbnbs-server-driven-ui-system-842244c5f5).
- Yelp built [CHAOS](https://engineeringblog.yelp.com/2024/03/chaos-yelps-unified-framework-for-server-driven-ui.html?utm_source=chatgpt.com).
- Lyft developed [their own system](https://eng.lyft.com/the-journey-to-server-driven-ui-at-lyft-bikes-and-scooters-c19264a0378e).
- Shopify powers their Shop App [using SDUI](https://shopify.engineering/server-driven-ui-in-shop-app).

If you don't have the resources to build something like that from scratch—but want the same level of flexibility and power—Composify might be what you're looking for. 

Want to see what's possible with SDUI and visual editing? [Check out the use cases →](/docs/use-cases/instant-ui-updates)
