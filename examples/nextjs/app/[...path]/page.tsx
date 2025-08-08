import '@composify/react/preset';
import '@/components';

import { Renderer } from '@composify/react/renderer';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ path: string[] }> }) {
  const { path = [] } = await params;

  const slug = `/${path.join('/')}`;
  const res = await fetch(`http://localhost:3000/api/documents?slug=${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  });
  const source = await res.text();

  if (!source) {
    return notFound();
  }

  return (
    <main className="p-4">
      <section className="flex items-end justify-between mb-4">
        <h1 className="text-2xl">Rendering page {slug}</h1>
        <a href={`/editor/${path.join('/')}`} className="text-blue-500 hover:underline">
          Visit Editor
        </a>
      </section>
      <section className="border rounded-sm border-neutral-200">
        <Renderer source={source} />
      </section>
    </main>
  );
}
