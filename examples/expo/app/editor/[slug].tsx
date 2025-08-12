import '@composify/react/preset';
import '@composify/react/style.css';
import '@/components';

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

      setSource(
        content ??
          `
<VStack
  alignVertical="center"
  alignHorizontal="stretch"
  padding={{ top: 16, bottom: 16, left: 16, right: 16 }}
  gap={4}
>
  <Heading level={1} weight="extrabold">Server Driven UI made easy</Heading>
  <Body color="#1E1E1E" weight="normal">
    Bring visual editing to your components — no rewrites needed.
  </Body>
  <HStack
    alignVertical="stretch"
    alignHorizontal="flex-start"
    gap={4}
    margin={{ top: 16 }}
  >
    <Button variant="primary">Learn More ›</Button>
    <Button variant="outline">Get started →</Button>
  </HStack>
</VStack>
  `.trim()
      );
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

  return <Editor title={slug} source={source} onSubmit={handleSubmit} />;
}
