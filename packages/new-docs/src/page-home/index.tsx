import { SourceProvider, SourceRenderer } from './SourceContext';

export const HomePage = () => (
  <main className="content-container">
    <SourceProvider source={`<h1>Home</h1>`}>
      <SourceRenderer />
    </SourceProvider>
  </main>
);
