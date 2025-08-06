import { Renderer } from '@composify/react/renderer';
import { useSource } from './SourceContext';

export const SourceRenderer = () => {
  const { source } = useSource();

  return <Renderer source={source} />;
};
