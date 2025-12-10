import { Renderer } from '@composify/react/renderer';
import type { FC } from 'react';
import { useSource } from './SourceContext';

export const SourceRenderer: FC<unknown> = () => {
  const { source } = useSource();

  return <Renderer source={source} />;
};
