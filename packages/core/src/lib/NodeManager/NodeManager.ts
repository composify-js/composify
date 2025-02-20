import { Node } from '../Parser';

const KEY_COMPOSIFY_ID = 'data-composify-id';

export const attachId = (node: Node): Node => {
  const propsWithId = node.props[KEY_COMPOSIFY_ID]
    ? node.props
    : { ...node.props, [KEY_COMPOSIFY_ID]: Date.now() + Math.random().toString(36).slice(2) };

  return {
    ...node,
    props: propsWithId,
    children: node.children.map(attachId),
  };
};
