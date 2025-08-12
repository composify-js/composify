import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('editor/:slug', 'routes/editor.tsx'),
  route(':slug', 'routes/page.tsx'),
] satisfies RouteConfig;
