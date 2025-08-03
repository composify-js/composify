import * as Preset from '@docusaurus/preset-classic';
import { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Composify',
  tagline: 'Server Driven UI made easy',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://composify.js.org',
  baseUrl: '/',
  // GitHub pages deployment config.
  organizationName: 'composify-js',
  projectName: 'composify',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/opengraph.png',
    navbar: {
      logo: {
        alt: 'composify',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/composify-js/composify',
          position: 'right',
          className: 'header--github-link',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs',
            },
            {
              label: 'Getting Started',
              to: '/docs/quickstart',
            },
            {
              label: 'API Reference',
              to: '/docs/api',
            },
          ],
        },
        {
          title: 'Use Cases',
          items: [
            {
              label: 'Server Driven UI',
              to: '/docs/use-cases/server-driven-ui',
            },
            {
              label: 'No-Code Tools',
              to: '/docs/use-cases/no-code-tools',
            },
            {
              label: 'Design Systems',
              to: '/docs/use-cases/design-systems',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'About Us',
              to: '/about',
            },
            {
              label: 'Contact us',
              to: '/contact',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      logo: {
        alt: 'composify',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
        href: '/',
        width: 153,
        height: 32,
      },
      copyright: `© ${new Date().getFullYear()} Hills Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
