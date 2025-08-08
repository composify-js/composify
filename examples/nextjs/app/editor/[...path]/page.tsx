import EditorPage from './client';

export default async function Page({ params }: { params: Promise<{ path: string[] }> }) {
  const { path = [] } = await params;

  const slug = `/${path.join('/')}`;
  const res = await fetch(`http://localhost:3000/api/documents?slug=${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  });
  const source = await res.text();

  return <EditorPage slug={slug} source={source || '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />'} />;
}
