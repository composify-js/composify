import defaultConfig from '../../eslint.config.mjs';

export default [
  ...defaultConfig,
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
];
