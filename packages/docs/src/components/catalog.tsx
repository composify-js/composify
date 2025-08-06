import { Catalog } from '@composify/core';
import { ComponentProps } from 'react';
import { CodePreview } from './CodePreview';
import { Feature } from './Feature';
import { FeatureGroup } from './FeatureGroup';
import { HeroBanner } from './HeroBanner';
import { MainCta } from './MainCta';
import { Playground } from './Playground';

Catalog.register<ComponentProps<typeof HeroBanner>>('HeroBanner', {
  component: HeroBanner,
  props: {
    tagline: {
      label: 'Tagline',
      type: 'text',
      default: 'Server Driven UI made easy',
    },
    description: {
      label: 'Description',
      type: 'textarea',
      default: 'Bring visual editing to your components — no rewrites needed.',
    },
  },
});

Catalog.register<ComponentProps<typeof Playground>>('Playground', {
  component: Playground,
  props: {},
});

Catalog.register<ComponentProps<typeof FeatureGroup>>('FeatureGroup', {
  component: FeatureGroup,
  props: {
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});

Catalog.register<ComponentProps<typeof Feature>>('Feature', {
  component: Feature,
  props: {
    title: {
      label: 'Title',
      type: 'text',
      default: 'Instant visual editing',
    },
    description: {
      label: 'Description',
      type: 'textarea',
      default: "Drag and drop anything, anywhere. Everything works exactly as you'd expect.",
    },
    preview: {
      label: 'Preview',
      type: 'node',
    },
    wide: {
      label: 'Wide',
      type: 'boolean',
      default: false,
    },
  },
});

Catalog.register<ComponentProps<typeof CodePreview>>('CodePreview', {
  component: CodePreview,
  props: {
    language: {
      label: 'Language',
      type: 'select',
      options: [
        {
          label: 'JavaScript',
          value: 'jsx',
        },
        {
          label: 'Python',
          value: 'python',
        },
      ],
    },
    code: {
      label: 'Code',
      type: 'textarea',
      default: 'const HelloWorld = () => <div>Hello, world!</div>;',
    },
  },
});

Catalog.register<ComponentProps<typeof MainCta>>('MainCta', {
  component: MainCta,
  props: {
    to: {
      label: 'Link',
      type: 'text',
      default: '/docs/getting-started',
    },
    children: {
      label: 'Text',
      type: 'text',
      default: 'Get started →',
    },
  },
});
