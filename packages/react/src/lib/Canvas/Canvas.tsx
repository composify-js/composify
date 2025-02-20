import { createElement } from 'react';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { useEditing } from '../EditingContext';
import { Pragma, Renderer } from '../Renderer';

const pragma: Pragma = {
  jsx: (type, props, ...children) =>
    createElement(
      Draggable,
      { type: TargetType.Canvas, key: props.key as string | undefined },
      createElement(type, props, children)
    ),
};

export const Canvas = () => {
  const { source } = useEditing();

  return <Renderer source={source} pragma={pragma} />;
};
