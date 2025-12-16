import '@composify/react/style.css';
import { Editor } from '@composify/react/editor';
import type { FC } from 'react';
import { useSource } from './SourceContext';

export const SourceEditor: FC<unknown> = () => {
  const { source, setSource } = useSource();

  return (
    <Editor
      title="Example"
      source={source}
      viewports={[
        { width: 425, label: 'Mobile - 425px' },
        { width: 768, label: 'Tablet - 768px', initial: true },
        { width: 1024, label: 'Laptop - 1024px' },
        { width: 1440, label: 'Desktop - 1440px' },
      ]}
      onSubmit={setSource}
    />
  );
};
