import { Catalog } from '@composify/react/renderer';
import { CodePreview } from './CodePreview';
import { Feature } from './Feature';
import { FeatureGroup } from './FeatureGroup';
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

Catalog.register('Feature', {
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

Catalog.register('CodePreview', {
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
