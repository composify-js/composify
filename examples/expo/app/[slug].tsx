import '@/components/catalog';

import { Renderer } from '@composify/react/renderer';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Page() {
  const [source, setSource] = useState<string | null>(null);

  const { slug } = useLocalSearchParams<{ slug?: string }>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:9000/documents/${slug}`, {
        cache: 'no-store',
      });
      const { content } = await res.json().catch(() => ({}));

      setSource(content ?? '<VStack />');
    };

    fetchData();
  }, [slug]);

  if (!source) {
    return null;
  }

  return <Renderer source={source} />;
}
