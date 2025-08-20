import '@/components';

import { Renderer } from '@composify/react/renderer';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`http://localhost:9000/documents/${slug}`, {
    cache: 'no-store',
  });
  const { content } = await res.json().catch(() => ({}));

  if (!content) {
    return notFound();
  }

  return (
    <main className="p-4">
      <section className="flex items-end justify-between mb-4">
        <h1 className="text-2xl">Rendering page {slug}</h1>
        <a href={`/editor/${slug}`} className="text-blue-500 hover:underline">
          Visit Editor
        </a>
      </section>
      <section className="border rounded-sm border-neutral-200">
        <Renderer source={content} />
      </section>
    </main>
  );
}
