import '@composify/react/preset';
import '@composify/react/style.css';
import '~/components';

import { Editor } from '@composify/react/editor';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData, useNavigate } from 'react-router';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const slug = '/' + (params['*'] ?? '');
  const url = new URL(request.url);

  const res = await fetch(new URL(`/api/documents?slug=${encodeURIComponent(slug)}`, url.origin));
  const source = await res.text();

  return {
    slug,
    source: source || '<VStack size={{ height: 100 }} backgroundColor="#f8fafc" />',
  };
}

export default function EditorPage() {
  const { slug, source } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleSubmit = async (src: string) => {
    await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, content: src }),
    });

    if (!window.confirm('Saved successfully. Keep editing?')) {
      navigate(slug);
    }
  };

  return <Editor title={slug} source={source} onSubmit={handleSubmit} />;
}
