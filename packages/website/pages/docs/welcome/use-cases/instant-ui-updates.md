# Instant UI updates [Beyond code push]

Traditionally, most apps have a hardcoded UI defined on the client. So even a small tweak — like changing a banner title or adjusting layout spacing — requires a full deploy, sometimes even an app store review.

With Composify, you control the UI structure from the server. That means you can ship changes instantly. No waiting for CI/CD pipelines, no manual QA passes, no user update prompts. The next time the app loads, it fetches the latest layout and renders it.

While tools like CodePush or Over-the-Air updates can help, they still involve downloading and applying a new JS bundle. Composify skips all that. You just send a new JSX string, and the renderer takes care of the rest.
