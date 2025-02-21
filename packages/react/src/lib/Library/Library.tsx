import { Catalog, PopulatedNodeInfo } from '@composify/core';
import { createElement } from 'react';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Pragma, Renderer } from '../Renderer';

const pragma: Pragma = {
  jsx: (type, props, info, ...children) => {
    const spec = Catalog.get(info.type);
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
        item: info as PopulatedNodeInfo,
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
