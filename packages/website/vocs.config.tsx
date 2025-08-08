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
      text: 'Getting Started',
      link: '/docs/getting-started',
    },
    {
      text: 'Integration',
      collapsed: false,
      items: [
        { text: 'React', link: '/docs/integration/react' },
        { text: 'React Native', link: '/docs/integration/react-native' },
        { text: 'Next.js', link: '/docs/integration/nextjs' },
        { text: 'Astro', link: '/docs/integration/astro' },
        { text: 'Gatsby', link: '/docs/integration/gatsby' },
      ],
    },
    {
      text: 'Catalog',
      collapsed: true,
      items: [
        { text: 'Overview', link: '/docs/catalog' },
        { text: 'Grouping', link: '/docs/catalog/grouping' },
        { text: 'Unregistered components', link: '/docs/catalog/unregistered-components' },
        {
          text: 'Properties',
          items: [
            { text: 'Boolean property', link: '/docs/catalog/boolean-property' },
            { text: 'Number property', link: '/docs/catalog/number-property' },
            { text: 'Text property', link: '/docs/catalog/text-property' },
            { text: 'Radio property', link: '/docs/catalog/radio-property' },
            { text: 'Select property', link: '/docs/catalog/select-property' },
            { text: 'Node property', link: '/docs/catalog/node-property' },
            { text: 'Array property', link: '/docs/catalog/array-property' },
            { text: 'Object property', link: '/docs/catalog/object-property' },
            { text: 'Custom property', link: '/docs/catalog/custom-property' },
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
      text: 'Preset',
      collapsed: true,
      items: [{ text: 'Overview', link: '/docs/preset' }],
    },
    {
      text: 'API Reference',
      collapsed: true,
      items: [
        { text: 'Catalog', link: '/docs/api/catalog' },
        { text: 'Editor', link: '/docs/api/editor' },
        { text: 'Preset', link: '/docs/api/preset' },
      ],
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
  ],
  rootDir: '',
});
