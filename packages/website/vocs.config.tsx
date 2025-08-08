import { defineConfig } from 'vocs';

export default defineConfig({
  title: 'Composify',
  baseUrl: 'https://composify.js.org',
  description: 'Server Driven UI made easy',
  iconUrl: '/brand/icon.svg',
  logoUrl: {
    light: '/brand/logo-light.svg',
    dark: '/brand/logo-dark.svg',
  },
  ogImageUrl: '/brand/opengraph.png',
  markdown: {
    code: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  head: () => (
    <>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="composify" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  ),
  topNav: [
    { text: 'Docs', link: '/docs' },
    { text: 'Blog', link: '/blog' },
  ],
  sidebar: [
    {
      text: 'Introduction',
      link: '/docs',
    },
    {
      text: 'Background',
      link: '/docs/background',
    },
    {
      text: 'Use Cases',
      collapsed: true,
      items: [
        { text: 'Instant UI Updates', link: '/docs/use-cases/instant-ui-updates' },
        { text: 'Unblock Your Team', link: '/docs/use-cases/unblock-your-team' },
        { text: 'AB Testing and Prototyping', link: '/docs/use-cases/ab-testing-and-prototyping' },
        { text: 'Design Tools', link: '/docs/use-cases/design-tools' },
        { text: 'No-Code Tools', link: '/docs/use-cases/no-code-tools' },
      ],
    },
    {
      text: 'Getting Started',
      link: '/docs/getting-started',
    },
  ],
  rootDir: '',
});
