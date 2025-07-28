import { Catalog, Node } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { Children, createElement } from 'react';
import { Pragma, Renderer } from '../../renderer/Renderer';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Droppable } from '../Droppable';
import { useEditing } from '../EditingContext';
import styles from './Preview.module.css';

const pragma: Pragma = {
  jsx: (type, props, node, ...children) => {
    const spec = Catalog.get(node.type);
    const childrenPropSpec = (spec.props ?? {}).children;
    const acceptsChildren = childrenPropSpec?.type === 'node';

    if (!node.id) {
      throw new Error(`Node not populated: ${JSON.stringify(node)}`);
    }

    return createElement(
      Draggable,
      {
        type: TargetType.Canvas,
        key: node.id,
        item: node,
      },
      createElement(
        type,
        {
          ...Object.entries(props).reduce(
            (acc, [key, value]) => ({
              ...acc,
              [key]:
                value && typeof value === 'object' && '__composify__' in value ? (
                  <Renderer source={value as unknown as Node} />
                ) : (
                  value
                ),
            }),
            {} as typeof props
          ),
        },
        acceptsChildren
          ? [
              createElement(Droppable, {
                key: `${node.id}-default`,
                item: node,
                index: 0,
              }),
              ...(children?.length > 0
                ? (Children.map(children, (child, index) => [
                    child,
                    createElement(Droppable, {
                      key: `${node.id}-${index + 1}`,
                      item: node,
                      index: index + 1,
                    }),
                  ])?.flat() ?? [])
                : children),
            ]
          : children
      )
    );
  },
};

const getClassName = getClassNameFactory('Preview', styles);

export const Preview = () => {
  const { source } = useEditing();

  return (
    <div className={getClassName()}>
      <Renderer source={source} pragma={pragma} />
    </div>
  );
};
