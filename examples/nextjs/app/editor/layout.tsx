import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editor',
  description: 'Editing Composify components in Next.js',
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
