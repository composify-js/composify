import { Node } from '../Parser';

export const attachId = (node: Node): Node => {
  const [type, props, ...children] = node;

  const propsWithId = props['data-composify-id']
    ? props
    : { ...props, 'data-composify-id': Date.now() + Math.random().toString(36).slice(2) };

  return [type, propsWithId, ...children.map(attachId)];
};
