import type { NextConfig } from 'next';
import nextra from 'nextra';

const withNextra = nextra({
  contentDirBasePath: '/blog',
});

const nextConfig: NextConfig = withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
});

export default nextConfig;
