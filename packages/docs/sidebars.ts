import { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'introduction',
    'background',
    {
      type: 'category',
      label: 'Use Cases',
      collapsible: true,
      collapsed: true,
      items: [
        'use-cases/instant-ui-updates',
        'use-cases/unblock-your-team',
        'use-cases/ab-testing-and-personalization',
        'use-cases/design-systems',
        'use-cases/no-code-tools',
      ],
    },
    'getting-started',
  ],
};

export default sidebars;
