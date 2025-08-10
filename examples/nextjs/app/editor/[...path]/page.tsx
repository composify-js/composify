import EditorPage from './client';

export default async function Page({ params }: { params: Promise<{ path: string[] }> }) {
  const { path = [] } = await params;

  const slug = `/${path.join('/')}`;
  const res = await fetch(`http://localhost:3000/api/documents?slug=${encodeURIComponent(slug)}`, {
    cache: 'no-store',
  });
  const source = await res.text();

  return (
    <EditorPage
      slug={slug}
      source={
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
`.trim()
      }
    />
  );
}
