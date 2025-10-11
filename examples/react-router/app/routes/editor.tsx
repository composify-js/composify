import '@composify/react/style.css';
import '~/components';

import { Editor } from '@composify/react/editor';
import { type LoaderFunctionArgs, useLoaderData, useNavigate } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? '';

  const res = await fetch(`http://localhost:9000/documents/${slug}`);
  const { content } = await res.json().catch(() => ({}));

  return {
    slug,
    content:
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
  `.trim(),
  };
}

export default function EditorPage() {
  const { slug, content } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleSubmit = async (source: string) => {
    await fetch(`http://localhost:9000/documents/${slug}`, {
      method: 'DELETE',
    }).catch(() => null);

    await fetch('http://localhost:9000/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: slug,
        content: source,
      }),
    });

    if (!window.confirm('Saved successfully. Keep editing?')) {
      navigate(`/${slug}`);
    }
  };

  return <Editor title={slug} source={content} onSubmit={handleSubmit} />;
}
