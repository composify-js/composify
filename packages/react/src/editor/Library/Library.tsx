import { Catalog } from '@composify/core';
import { createElement } from 'react';
import { Pragma, Renderer } from '../../renderer';
import { ClassNames, TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { SearchForm } from '../SearchForm';

const pragma: Pragma = {
  jsx: (_, props, node) => {
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
      { key: node.type } as Record<string, unknown>
    );

    return createElement(
      Draggable,
      {
        type: TargetType.Library,
        key: props.key as string,
        item: {
          ...node,
          props: defaultProps,
        },
      },
      createElement(
        'p',
        {
          className: ClassNames.SpecItem,
        },
        node.type
      )
    );
  },
};

export const Library = () => (
  <div className={ClassNames.Library}>
    <SearchForm />
    <div className={ClassNames.SpecList}>
      {Catalog.getAll().map(([name]) => (
        <Renderer source={`<${name} />`} key={name} pragma={pragma} />
      ))}
    </div>
  </div>
);
