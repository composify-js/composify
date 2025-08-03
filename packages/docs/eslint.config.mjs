import defaultConfig from '../../eslint.config.mjs';

export default [
  ...defaultConfig,
  {
    rules: {
      'import/no-unresolved': ['error', { ignore: ['^@theme', '^@docusaurus', '^@site'] }],
    },
  },
];
