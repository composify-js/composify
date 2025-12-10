'use client';

import '@/components/catalog';
import '@composify/react/style.css';

import { Editor } from '@composify/react/editor';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditorPage() {
  const params = useParams<{ slug: string }>();
  const [source, setSource] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:9000/documents/${params.slug}`)
      .then((res) => res.json())
      .then((data) => setSource(data.content || '<VStack />'))
      .catch(() => setSource('<VStack />'));
  }, [params.slug]);

  if (!source) {
    return null;
  }

  const handleSubmit = async (value: string) => {
    await fetch(`http://localhost:9000/documents/${params.slug}`, {
      method: 'DELETE',
    }).catch(() => null);

    await fetch('http://localhost:9000/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: params.slug,
        content: value,
      }),
    });

    alert('Saved!');
  };

  return <Editor title={`Editing: ${params.slug}`} source={source} onSubmit={handleSubmit} />;
}
