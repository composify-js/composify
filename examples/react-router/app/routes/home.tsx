export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Composify + React Router</h1>
      <p className="text-neutral-600">
        Visit{' '}
        <a href="/editor/foo" className="text-blue-500 hover:underline">
          /editor/foo
        </a>{' '}
        to start editing
      </p>
    </main>
  );
}
