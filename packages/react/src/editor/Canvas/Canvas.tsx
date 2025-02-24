import { Catalog, PopulatedNode } from '@composify/core';
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

    if (!('id' in node)) {
      throw new Error(`Node not populated: ${JSON.stringify(node)}`);
    }

    const populatedNode = node as unknown as PopulatedNode;

    return createElement(
      Draggable,
      {
        type: TargetType.Canvas,
        key: populatedNode.id,
        item: populatedNode,
      },
      createElement(type, props, [
        createElement(Droppable, {
          key: `${populatedNode.id}-default`,
          item: populatedNode,
          index: 0,
        }),
        ...(acceptsChildren && children?.length > 0
          ? (Children.map(children, (child, index) => [
              createElement(Droppable, {
                key: `${populatedNode.id}-${index}`,
                item: populatedNode,
                index,
              }),
              child,
            ])
              ?.flat()
              .concat(
                createElement(Droppable, {
                  key: `${populatedNode.id}-${children.length}`,
                  item: populatedNode,
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
