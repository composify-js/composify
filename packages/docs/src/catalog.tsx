import { Catalog } from '@composify/react/renderer';
import { CodePreview } from './CodePreview';
import { FeatureGroup } from './FeatureGroup';
import { FeatureItem } from './FeatureItem';
import { HeroBanner } from './HeroBanner';
import { HStack } from './HStack';
import { MainCta } from './MainCta';
import { Playground } from './Playground';
import { VStack } from './VStack';

Catalog.register('HStack', {
  component: HStack,
  category: 'Layout',
  props: {
    alignHorizontal: {
      label: 'Horizontal Alignment',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
        { label: 'Space Evenly', value: 'space-evenly' },
      ],
      default: 'flex-start',
      optional: true,
    },
    alignVertical: {
      label: 'Vertical Alignment',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Stretch', value: 'stretch' },
      ],
      default: 'stretch',
      optional: true,
    },
    gap: {
      label: 'Gap',
      type: 'number',
      default: 0,
      optional: true,
    },
    size: {
      label: 'Size',
      type: 'object',
      fields: {
        width: {
          label: 'Width',
          type: 'number',
          default: 100,
          optional: true,
        },
        minWidth: {
          label: 'Min Width',
          type: 'number',
          default: 0,
          optional: true,
        },
        maxWidth: {
          label: 'Max Width',
          type: 'number',
          default: 1000,
          optional: true,
        },
        height: {
          label: 'Height',
          type: 'number',
          default: 100,
          optional: true,
        },
        minHeight: {
          label: 'Min Height',
          type: 'number',
          default: 0,
          optional: true,
        },
        maxHeight: {
          label: 'Max Height',
          type: 'number',
          default: 1000,
          optional: true,
        },
      },
      optional: true,
    },
    padding: {
      label: 'Padding',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
        left: {
          label: 'Left',
          type: 'number',
          default: 0,
        },
      },
      optional: true,
    },
    margin: {
      label: 'Margin',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
        left: {
          label: 'Left',
          type: 'number',
          default: 0,
        },
      },
      optional: true,
    },
    backgroundColor: {
      label: 'Background Color',
      type: 'text',
      default: '#ffffff',
      optional: true,
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});

Catalog.register('VStack', {
  component: VStack,
  category: 'Layout',
  props: {
    alignHorizontal: {
      label: 'Horizontal Alignment',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Stretch', value: 'stretch' },
      ],
      default: 'stretch',
      optional: true,
    },
    alignVertical: {
      label: 'Vertical Alignment',
      type: 'select',
      options: [
        { label: 'Start', value: 'flex-start' },
        { label: 'End', value: 'flex-end' },
        { label: 'Center', value: 'center' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Space Around', value: 'space-around' },
        { label: 'Space Evenly', value: 'space-evenly' },
      ],
      default: 'flex-start',
      optional: true,
    },
    gap: {
      label: 'Gap',
      type: 'number',
      default: 0,
      optional: true,
    },
    size: {
      label: 'Size',
      type: 'object',
      fields: {
        width: {
          label: 'Width',
          type: 'number',
          default: 100,
          optional: true,
        },
        minWidth: {
          label: 'Min Width',
          type: 'number',
          default: 0,
          optional: true,
        },
        maxWidth: {
          label: 'Max Width',
          type: 'number',
          default: 1000,
          optional: true,
        },
        height: {
          label: 'Height',
          type: 'number',
          default: 100,
          optional: true,
        },
        minHeight: {
          label: 'Min Height',
          type: 'number',
          default: 0,
          optional: true,
        },
        maxHeight: {
          label: 'Max Height',
          type: 'number',
          default: 1000,
          optional: true,
        },
      },
      optional: true,
    },
    padding: {
      label: 'Padding',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
        left: {
          label: 'Left',
          type: 'number',
          default: 0,
        },
      },
      optional: true,
    },
    margin: {
      label: 'Margin',
      type: 'object',
      fields: {
        top: {
          label: 'Top',
          type: 'number',
          default: 0,
        },
        right: {
          label: 'Right',
          type: 'number',
          default: 0,
        },
        bottom: {
          label: 'Bottom',
          type: 'number',
          default: 0,
        },
        left: {
          label: 'Left',
          type: 'number',
          default: 0,
        },
      },
      optional: true,
    },
    backgroundColor: {
      label: 'Background Color',
      type: 'text',
      default: '#ffffff',
      optional: true,
    },
    children: {
      label: 'Children',
      type: 'node',
    },
  },
});

Catalog.register('HeroBanner', {
  component: HeroBanner,
  category: 'Landing',
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
        { label: 'View Demo →', href: '/demo', primary: false },
      ],
    },
  },
});

Catalog.register('Playground', {
  component: Playground,
  category: 'Landing',
  props: {
    mode: {
      label: 'Mode',
      type: 'select',
      options: [
        { label: 'Landing', value: 'landing' },
        { label: 'Docs', value: 'docs' },
      ],
      default: 'landing',
    },
  },
});

Catalog.register('FeatureGroup', {
  component: FeatureGroup,
  category: 'Landing',
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
  category: 'Landing',
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
  category: 'Landing',
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
  category: 'Landing',
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
