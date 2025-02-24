import { Catalog, PopulatedNode } from '@composify/core';
import { createElement } from 'react';
import { Pragma, Renderer } from '../../renderer/Renderer';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';

const pragma: Pragma = {
  jsx: (type, props, node, ...children) => {
    const spec = Catalog.get(node.type);
    const specProps = spec.props ?? {};

    const defaultProps = Object.entries(specProps).reduce(
      (acc, [key, value]) =>
        value?.default
          ? {
              ...acc,
              [key]: value.default,
            }
          : acc,
      {} as Record<string, unknown>
    );

    return createElement(
      Draggable,
      {
        type: TargetType.Library,
        key: props.key as string,
        item: node as unknown as PopulatedNode,
      },
      createElement(type, defaultProps, children)
    );
  },
};

export const Library = () => (
  <div>
    {Catalog.getAll().map(([name]) => (
      <Renderer source={`<${name} />`} key={name} pragma={pragma} />
    ))}
  </div>
);
