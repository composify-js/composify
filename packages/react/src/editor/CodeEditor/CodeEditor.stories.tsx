import { EditingProvider } from '../EditingContext';
import { Theme } from '../Theme';
import { CodeEditor } from './CodeEditor';

export const BasicUsage = () => {
  const source = `
    <Text color="#1E1E1E" size="md" weight="normal" align="left">Welcome to Composify! 👋</Text>
  `;

  return (
    <main style={{ display: 'flex', height: '100vh' }}>
      <Theme />
      <EditingProvider source={source}>
        <CodeEditor />
      </EditingProvider>
    </main>
  );
};
