import { Catalog } from '@composify/core';
import { Editor } from './Editor';

const Stack = ({ width, height, ...props }: { width: number; height: number }) => (
  <div
    style={{
      width: width ?? 'auto',
      height: height ?? 'auto',
      minWidth: 100,
      minHeight: 100,
      background: '#C3C3C3',
    }}
    {...props}
  />
);

Catalog.register('Stack', Stack);

export const BasicUsage = () => {
  const source = `
    <Stack>
      <Stack width={100} height={100} />
      <Stack width={100} height={100} />
      <Stack width={100} height={100} />
    </Stack>
  `;

  return <Editor source={source} />;
};
