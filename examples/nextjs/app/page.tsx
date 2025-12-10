export default function HomePage() {
  return (
    <main className="p-4">
      <section className="flex items-end justify-between mb-4">
        <h1 className="text-2xl">Welcome to Composify 👋</h1>
        <a href="/editor/test" className="text-blue-500 hover:underline">
          Edit /test page
        </a>
      </section>
    </main>
  );
}
