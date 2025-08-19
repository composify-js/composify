import { Catalog } from '@composify/react/renderer';
import { CodePreview } from './CodePreview';
import { FeatureGroup } from './FeatureGroup';
import { FeatureItem } from './FeatureItem';
import { HeroBanner } from './HeroBanner';
import { MainCta } from './MainCta';
import { Playground } from './Playground';

Catalog.register('HeroBanner', {
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
    actions: {
      label: 'Actions',
      type: 'array',
      item: {
        label: 'Action',
        type: 'object',
        fields: {
          label: {
            label: 'Label',
            type: 'text',
          },
          href: {
            label: 'URL',
            type: 'text',
          },
          primary: {
            label: 'Primary',
            type: 'boolean',
            default: false,
          },
        },
      },
      default: [
        { label: 'Learn more ›', href: '/docs', primary: true },
        { label: 'Get started →', href: '/docs/getting-started', primary: false },
      ],
    },
  },
});

Catalog.register('Playground', {
  component: Playground,
  props: {},
});

Catalog.register('FeatureGroup', {
  component: FeatureGroup,
  props: {
    title: {
      label: 'Title',
      type: 'text',
      default: 'Visual editing, powered by your components.',
    },
    description: {
      label: 'Description',
      type: 'textarea',
      default:
        'Write components once, let anyone build with them through a visual interface.\nPerfect for design systems, no-code tools, and server-driven UI.',
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});

Catalog.register('FeatureItem', {
  component: FeatureItem,
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
    spacing: {
      label: 'Preview Spacing',
      type: 'object',
      default: {
        top: 0,
        bottom: 0,
      },
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
      },
    },
  },
});

Catalog.register('CodePreview', {
  component: CodePreview,
  props: {
    asset: {
      label: 'Image asset',
      type: 'text',
      default: '/assets/jsx',
    },
  },
});

Catalog.register('MainCta', {
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
