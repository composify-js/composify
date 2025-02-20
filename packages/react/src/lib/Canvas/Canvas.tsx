import { Catalog } from '@composify/core';
import { createElement } from 'react';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Droppable } from '../Droppable';
import { DroppableMoveOnly } from '../DroppableMoveOnly';
import { useEditing } from '../EditingContext';
import { KEY_COMPOSIFY_TYPE, Pragma, Renderer } from '../Renderer';

const pragma: Pragma = {
  jsx: (type, props, ...children) => {
    const spec = Catalog.get(props[KEY_COMPOSIFY_TYPE] as string);
    const childrenPropSpec = (spec.props ?? {}).children;

    return createElement(
      Draggable,
      { type: TargetType.Canvas, key: props.key as string | undefined },
      createElement(type, props, [
        createElement(childrenPropSpec?.type === 'node' ? Droppable : DroppableMoveOnly, { key: Droppable.name }),
        ...children,
      ])
    );
  },
};

export const Canvas = () => {
  const { source } = useEditing();

  return <Renderer source={source} pragma={pragma} />;
};
