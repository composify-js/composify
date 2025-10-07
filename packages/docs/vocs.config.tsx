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
  theme: {
    accentColor: '#3B82F6',
    variables: {
      content: {
        horizontalPadding: '3rem',
        verticalPadding: '2rem',
        width: 'calc(64ch + (3rem * 2))',
      },
    },
  },
  head: () => (
    <>
      <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="Composify" />
      <link rel="manifest" href="/site.webmanifest" />
    </>
  ),
  topNav: [
    { text: 'Docs', link: '/docs' },
    { text: 'Cloud', link: '/cloud' },
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
      text: 'Getting Started',
      link: '/docs/getting-started',
    },
    {
      text: 'Tutorial',
      collapsed: false,
      items: [
        { text: 'Prerequisites', link: '/docs/tutorial/prerequisites' },
        { text: 'Next.js', link: '/docs/tutorial/nextjs' },
        { text: 'React Router', link: '/docs/tutorial/react-router' },
        { text: 'Expo', link: '/docs/tutorial/expo' },
        { text: 'Cloud', link: '/docs/tutorial/cloud' },
      ],
    },
    {
      text: 'Catalog',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/docs/catalog' },
        {
          text: 'Properties',
          items: [
            { text: 'Boolean property', link: '/docs/catalog/properties/boolean' },
            { text: 'Number property', link: '/docs/catalog/properties/number' },
            { text: 'Text property', link: '/docs/catalog/properties/text' },
            { text: 'Textarea property', link: '/docs/catalog/properties/textarea' },
            { text: 'Radio property', link: '/docs/catalog/properties/radio' },
            { text: 'Select property', link: '/docs/catalog/properties/select' },
            { text: 'Node property', link: '/docs/catalog/properties/node' },
            { text: 'Array property', link: '/docs/catalog/properties/array' },
            { text: 'Object property', link: '/docs/catalog/properties/object' },
            { text: 'Custom property', link: '/docs/catalog/properties/custom' },
          ],
        },
      ],
    },
    {
      text: 'Editor',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/docs/editor' },
        { text: 'Custom viewports', link: '/docs/editor/custom-viewports' },
        { text: 'Custom controls', link: '/docs/editor/custom-controls' },
      ],
    },
    {
      text: 'Renderer',
      collapsed: true,
      items: [{ text: 'Overview', link: '/docs/renderer' }],
    },
    {
      text: 'Use Cases',
      collapsed: true,
      items: [
        { text: 'Instant UI Updates', link: '/docs/use-cases/instant-ui-updates' },
        { text: 'AB Testing and Prototyping', link: '/docs/use-cases/ab-testing-and-prototyping' },
        { text: 'Headless CMS', link: '/docs/use-cases/headless-cms' },
        { text: 'No-Code Tools', link: '/docs/use-cases/no-code-tools' },
        { text: 'Unblock Your Team', link: '/docs/use-cases/unblock-your-team' },
        { text: 'Design Tools', link: '/docs/use-cases/design-tools' },
      ],
    },
  ],
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/composify-js/composify',
    },
  ],
  rootDir: '',
});
