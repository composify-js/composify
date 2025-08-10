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
    source:
      source ||
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
`.trim(),
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
