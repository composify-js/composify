import { Catalog } from '@composify/core';
import { Children, createElement } from 'react';
import { Pragma, Renderer } from '../../renderer/Renderer';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Droppable } from '../Droppable';
import { useEditing } from '../EditingContext';

const pragma: Pragma = {
  jsx: (type, props, node, ...children) => {
    const spec = Catalog.get(node.type);
    const childrenPropSpec = (spec.props ?? {}).children;
    const acceptsChildren = childrenPropSpec?.type === 'node';

    if (!node.id) {
      throw new Error(`Node not populated: ${JSON.stringify(node)}`);
    }

    return createElement(
      Draggable,
      {
        type: TargetType.Canvas,
        key: node.id,
        item: node,
      },
      createElement(type, props, [
        createElement(Droppable, {
          key: `${node.id}-default`,
          item: node,
          index: 0,
        }),
        ...(acceptsChildren && children?.length > 0
          ? (Children.map(children, (child, index) => [
              createElement(Droppable, {
                key: `${node.id}-${index}`,
                item: node,
                index,
              }),
              child,
            ])
              ?.flat()
              .concat(
                createElement(Droppable, {
                  key: `${node.id}-${children.length}`,
                  item: node,
                  index: children.length,
                })
              ) ?? [])
          : children),
      ])
    );
  },
};

export const Canvas = () => {
  const { source } = useEditing();

  return <Renderer source={source} pragma={pragma} />;
};
