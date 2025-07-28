import { Catalog, Node, Parser } from '@composify/core';
import { createElement, FC, ReactNode, useMemo } from 'react';

export type Pragma = {
  jsx: (type: string, props: Record<string, unknown>, info: Node, ...children: ReactNode[]) => ReactNode;
};

const DEFAULT_PRAGMA: Pragma = {
  jsx: (type, props, _, ...children) => createElement(type, props, ...children),
};

const renderElement = (node: Node, pragma: Pragma): ReactNode => {
  const { component } = Catalog.get(node.type);

  return pragma.jsx(
    component,
    {
      ...Object.entries(node.props).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value && typeof value === 'object' && '__composify__' in value ? <Renderer source={value} /> : value,
        }),
        {} as typeof node.props
      ),
    },
    node,
    ...node.children.map((child, index) =>
      typeof child === 'object'
        ? renderElement(
            {
              ...child,
              props: {
                ...child.props,
                key: node.id ?? index,
              },
            },
            pragma
          )
        : child
    )
  );
};

type Props = {
  source: string | Node;
  pragma?: Pragma;
};

export const Renderer: FC<Props> = ({ source, pragma = DEFAULT_PRAGMA }) => {
  const content = useMemo(() => (typeof source === 'string' ? Parser.parse(source) : source), [source]);

  return renderElement(content, pragma);
};
