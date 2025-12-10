import '@/components/catalog';
import '@composify/react/style.css';

import { Editor } from '@composify/react/editor';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export default function EditorPage() {
  const [source, setSource] = useState<string | null>(null);

  const { slug } = useLocalSearchParams<{ slug: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:9000/documents/${slug}`, {
        cache: 'no-store',
      });

      const { content } = await res.json().catch(() => ({}));

      setSource(content ?? '<VStack size={{ height: 200 }} backgroundColor="#f8fafc" />');
    };

    fetchData();
  }, [slug]);

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

    Alert.alert('Saved successfully');
  };

  if (!source) {
    return null;
  }

  return <Editor title={`Editing: ${slug}`} source={source} onSubmit={handleSubmit} />;
}
