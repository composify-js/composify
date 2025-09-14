import { Children, createElement, Fragment } from 'react';
import { Catalog, type Pragma, Renderer } from '../../renderer';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { Droppable } from '../Droppable';
import { useEditing } from '../EditingContext';

const pragma: Pragma = {
  jsx: (type, props, node, ...children) => {
    const spec = Catalog.get(node.type);

    if (!spec) {
      return createElement(Fragment, {}, children);
    }

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
        props,
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

export const Preview = () => {
  const { root } = useEditing();

  if (root.type === 'Fragment' && root.children.length === 0) {
    return <Droppable item={root} index={0} replace={true} />;
  }

  return <Renderer source={root} pragma={pragma} />;
};
