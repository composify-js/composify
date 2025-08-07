import { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Introduction',
      collapsible: true,
      collapsed: true,
      link: {
        type: 'doc',
        id: 'introduction/index',
      },
      items: [
        'introduction/background',
        {
          type: 'category',
          label: 'Use Cases',
          collapsible: true,
          collapsed: true,
          items: [
            'introduction/use-cases/instant-ui-updates',
            'introduction/use-cases/unblock-your-team',
            'introduction/use-cases/ab-testing-and-prototyping',
            'introduction/use-cases/design-systems',
            'introduction/use-cases/no-code-tools',
          ],
        },
      ],
    },
    'getting-started',
  ],
};

export default sidebars;
