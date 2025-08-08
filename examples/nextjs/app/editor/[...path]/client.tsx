'use client';

import '@composify/react/preset';
import '@composify/react/style.css';
import '@/components';

import { Editor } from '@composify/react/editor';
import { useRouter } from 'next/navigation';

export default function EditorPage({ slug, source }: { slug: string; source: string }) {
  const router = useRouter();

  const handleSubmit = async (source: string) => {
    await fetch('/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        slug,
        content: source,
      }),
    });

    if (!window.confirm('Saved successfully. Keep editing?')) {
      router.push(slug);
    }
  };

  return <Editor title={slug} source={source} onSubmit={handleSubmit} />;
}
