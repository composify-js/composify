import '~/components/catalog';
import '@composify/react/style.css';

import { Editor } from '@composify/react/editor';
import { type LoaderFunctionArgs, useLoaderData } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';
  const res = await fetch(`http://localhost:9000/documents/${slug}`);
  const { content } = await res.json().catch(() => ({}));

  return {
    slug,
    content: content ?? '<VStack />',
  };
}

export default function EditorPage() {
  const { slug, content } = useLoaderData<typeof loader>();

  const handleSubmit = async (value: string) => {
    await fetch(`http://localhost:9000/documents/${slug}`, {
      method: 'DELETE',
    }).catch(() => null);

    await fetch('http://localhost:9000/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: slug,
        content: value,
      }),
    });

    alert('Saved!');
  };

  return <Editor title={`Editing: ${slug}`} source={content} onSubmit={handleSubmit} />;
}
