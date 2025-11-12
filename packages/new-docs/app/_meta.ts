export default {
  '*': {
    theme: {
      breadcrumb: false,
      timestamp: false,
      toc: false,
    },
  },
  index: {
    display: 'hidden',
  },
  docs: {
    type: 'page',
    title: 'Docs',
  },
  blog: {
    type: 'page',
    title: 'Blog',
  },
  cloud: {
    type: 'page',
    title: 'Cloud',
  },
  demo: {
    display: 'hidden',
    theme: {
      layout: 'full',
    },
  },
};
