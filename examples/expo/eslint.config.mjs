import defaultConfig from '../../eslint.config.mjs';

export default [
  ...defaultConfig,
  {
    ignores: ['metro.config.js'],
  },
];
