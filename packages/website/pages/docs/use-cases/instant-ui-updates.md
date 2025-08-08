# Instant UI updates [Beyond code pushs]

Most apps still ship with a hard-coded UI on the client. Which means even the tiniest tweak — a banner title change, a few pixels of spacing — needs a full redeploy, and sometimes even an app store review.

With Composify, your UI layout lives on the server. Change it there, and it's live instantly. No waiting for CI/CD, no dragging QA into the loop, no "please update your app" messages. The next time the client loads, it just pulls the latest layout and renders it.

CodePush or other over-the-air tools help, but they still require shipping and applying a new JS bundle. Composify skips that step entirely — send a new JSX string, and the renderer handles the rest.
