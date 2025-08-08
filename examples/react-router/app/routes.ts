import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('api/documents', 'routes/api.documents.ts'),
  route('editor/*', 'routes/editor.tsx'),
  route('*', 'routes/page.tsx'),
] satisfies RouteConfig;
