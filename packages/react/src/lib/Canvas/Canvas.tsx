import { Catalog, PopulatedNodeInfo } from '@composify/core';
import { Children, createElement } from 'react';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Droppable } from '../Droppable';
import { useEditing } from '../EditingContext';
import { Pragma, Renderer } from '../Renderer';

const pragma: Pragma = {
  jsx: (type, props, info, ...children) => {
    const spec = Catalog.get(info.type);
    const childrenPropSpec = (spec.props ?? {}).children;
    const acceptsChildren = childrenPropSpec?.type === 'node';

    if (info.id === undefined) {
      throw new Error(`Node not populated: ${JSON.stringify(info)}`);
    }

    return createElement(
      Draggable,
      {
        type: TargetType.Canvas,
        key: info.id,
        item: info as PopulatedNodeInfo,
      },
      createElement(type, props, [
        createElement(Droppable, {
          key: `${info.id}-default`,
          item: info as PopulatedNodeInfo,
          index: 0,
        }),
        ...(acceptsChildren && children?.length > 0
          ? (Children.map(children, (child, index) => [
              createElement(Droppable, {
                key: `${info.id}-${index}`,
                item: info as PopulatedNodeInfo,
                index,
              }),
              child,
            ])
              ?.flat()
              .concat(
                createElement(Droppable, {
                  key: `${info.id}-${children.length}`,
                  item: info as PopulatedNodeInfo,
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
