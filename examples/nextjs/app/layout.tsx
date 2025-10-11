import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Composify Next.js Example',
  description: 'Server Driven UI made easy 😍',
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
