import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Renderer',
  description: 'Render Composify components in Next.js',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
