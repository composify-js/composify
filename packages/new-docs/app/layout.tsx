import '@app/globals.css';

import { TopNavigation } from '@app/parcel-layout';
import type { Metadata, Viewport } from 'next';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Layout } from 'nextra-theme-docs';

export const metadata: Metadata = {
  title: {
    template: '%s | Composify',
    default: 'Server Driven UI made easy | Composify',
  },
  description: 'Server Driven UI made easy',
  keywords: ['composify', 'server driven ui', 'sdui', 'react', 'visual editor', 'wysiwyg', 'no code'],
  openGraph: {
    title: 'Composify',
    description: 'Server Driven UI made easy',
    url: 'https://composify.js.org',
    siteName: 'Composify',
    images: '/brand/opengraph.png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Composify',
    description: 'Server Driven UI made easy',
    images: '/brand/opengraph.png',
  },
  appleWebApp: {
    title: 'Composify',
  },
  icons: {
    icon: [
      { type: 'image/png', url: '/favicon-96x96.png' },
      { type: 'image/svg+xml', url: '/favicon.svg' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5F5F5',
  colorScheme: 'light dark',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning={true}>
      <Head backgroundColor={{ dark: 'rgb(17, 17, 17)', light: 'rgb(255, 255, 255)' }} />
      <body>
        <Layout
          navbar={<TopNavigation />}
          pageMap={await getPageMap()}
          editLink={null}
          feedback={{ content: null }}
          docsRepositoryBase="https://github.com/composify-js/composify/tree/main/packages/docs"
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
