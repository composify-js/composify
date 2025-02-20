import { Catalog } from '@composify/core';
import { createElement } from 'react';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Pragma, Renderer } from '../Renderer';

const pragma: Pragma = {
  jsx: (type, props, ...children) =>
    createElement(
      Draggable,
      { type: TargetType.Library, key: props.key as string | undefined },
      createElement(type, props, children)
    ),
};

export const Library = () => (
  <div>
    {Catalog.getAll().map(spec => (
      <Renderer source={`<${spec.component.name} />`} key={spec.component.name} pragma={pragma} />
    ))}
  </div>
);
