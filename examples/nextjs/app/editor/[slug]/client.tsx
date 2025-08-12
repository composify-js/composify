'use client';

import '@composify/react/preset';
import '@composify/react/style.css';
import '@/components';

import { Editor } from '@composify/react/editor';
import { useRouter } from 'next/navigation';

export default function EditorPage({ slug, content }: { slug: string; content: string }) {
  const router = useRouter();

  const handleSubmit = async (source: string) => {
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
        content: source,
      }),
    });

    if (!window.confirm('Saved successfully. Keep editing?')) {
      router.push(`/${slug}`);
    }
  };

  return <Editor title={slug} source={content} onSubmit={handleSubmit} />;
}
