import defaultConfig from '../../eslint.config.mjs';

export default [
  ...defaultConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
