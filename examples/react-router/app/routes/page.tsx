import '@composify/react/preset';
import '~/components';

import { Renderer } from '@composify/react/renderer';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';
  const res = await fetch(`http://localhost:9000/documents/${slug}`);
  const { content } = await res.json().catch(() => ({}));

  if (!content) {
    throw new Response('', { status: 404 });
  }

  return { slug, source: content };
}

export default function Page() {
  const { slug, source } = useLoaderData<typeof loader>();

  return (
    <main className="p-4">
      <section className="flex items-end justify-between mb-4">
        <h1 className="text-2xl">Rendering page {slug}</h1>
        <a href={`/editor/${slug}`} className="text-blue-500 hover:underline">
          Visit Editor
        </a>
      </section>
      <section className="border rounded-sm border-neutral-200">
        <Renderer source={source} />
      </section>
    </main>
  );
}
