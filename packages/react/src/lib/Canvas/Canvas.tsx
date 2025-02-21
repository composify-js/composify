import { Catalog, PopulatedNodeInfo } from '@composify/core';
import { createElement } from 'react';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Droppable } from '../Droppable';
import { useEditing } from '../EditingContext';
import { Pragma, Renderer } from '../Renderer';

const pragma: Pragma = {
  jsx: (type, props, info, ...children) => {
    const spec = Catalog.get(info.type);
    const childrenPropSpec = (spec.props ?? {}).children;

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
          key: info.id,
          item: info as PopulatedNodeInfo,
          nested: childrenPropSpec?.type === 'node',
        }),
        ...children,
      ])
    );
  },
};

export const Canvas = () => {
  const { source } = useEditing();

  return <Renderer source={source} pragma={pragma} />;
};
