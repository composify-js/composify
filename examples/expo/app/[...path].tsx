import '@composify/react/preset';
import '@/components';

import { Renderer } from '@composify/react/renderer';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Page() {
  const [source, setSource] = useState<string | null>(null);

  const { path } = useLocalSearchParams<{ path?: string | string[] }>();
  const slug = '/' + (Array.isArray(path) ? path.join('/') : (path ?? ''));

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/?slug=${encodeURIComponent(slug)}`, {
        cache: 'no-store',
      });

      const source = await res.text();

      setSource(
        source ||
          `
<VStack flex={1} alignHorizontal="center" alignVertical="center">
  <Heading level={3} weight="semibold">Not Found</Heading>
</VStack>
  `.trim()
      );
    };

    fetchData();
  }, [slug]);

  if (!source) {
    return null;
  }

  return <Renderer source={source} />;
}
