import EditorPage from './client';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const res = await fetch(`http://localhost:9000/documents/${slug}`, {
    cache: 'no-store',
  });
  const { content } = await res.json().catch(() => ({}));

  return (
    <EditorPage
      slug={slug}
      content={
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
      }
    />
  );
}
