import { Catalog, PopulatedNodeInfo } from '@composify/core';
import { createElement } from 'react';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Pragma, Renderer } from '../Renderer';

const pragma: Pragma = {
  jsx: (type, props, info, ...children) =>
    createElement(
      Draggable,
      {
        type: TargetType.Library,
        key: props.key as string,
        item: info as PopulatedNodeInfo,
      },
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
