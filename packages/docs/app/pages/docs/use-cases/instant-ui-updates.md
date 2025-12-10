# Instant UI Updates [Beyond code pushes]

Most apps ship with a hard-coded UI. Even small tweaks like changing a banner title or adjusting spacing require a full redeploy. Sometimes even an app store review.

With Composify, your UI lives on the server. Change it there, and it's live everywhere, instantly. No waiting for CI/CD, no bugging the QA team, no "please update your app" messages. Users just get the latest layout the next time they open the app.

Tools like CodePush help, but they still require shipping a new JavaScript bundle. Composify skips that entirely. Send a new JSX string, and the client-side renderer handles the rest.
