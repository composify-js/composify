# Instant UI updates [Beyond code pushs]

Most apps ship with a hard-coded UI. This means even the tiniest tweak—changing a banner title, adjusting a few pixels of spacing—requires a full redeploy and maybe even an app store review.

With Composify, your UI isn't hard-coded; it lives on the server. When you change it there, it's live everywhere, *instantly*. No waiting for CI/CD, no bugging the QA team, and no "please update your app" messages. The next time a user opens the app, they simply get the latest layout.

Tools like CodePush help, but they still require shipping a new JavaScript bundle. Composify skips that step entirely. You just send a new JSX string, and the client-side renderer handles the rest
