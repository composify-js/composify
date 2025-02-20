import { Catalog, Parser } from '@composify/core';
import { createElement, FC, ReactNode, useMemo } from 'react';

export const KEY_COMPOSIFY_TYPE = 'composify-type';

export type Pragma = {
  jsx: (type: string, props: Record<string, unknown>, ...children: ReactNode[]) => ReactNode;
};

const renderElement = (node: Parser.Node, pragma: Pragma): ReactNode => {
  const { component } = Catalog.get(node.type);

  return pragma.jsx(
    component,
    {
      ...node.props,
      [KEY_COMPOSIFY_TYPE]: node.type,
    },
    ...node.children.map((child, index) =>
      typeof child === 'object'
        ? renderElement(
            {
              ...child,
              props: {
                ...child.props,
                key: index,
              },
            },
            pragma
          )
        : child
    )
  );
};

type Props = {
  source: string | Parser.Node;
  pragma?: Pragma;
};

export const Renderer: FC<Props> = ({ source, pragma = { jsx: createElement } }) => {
  const content = useMemo(() => (typeof source === 'string' ? Parser.parse(source) : source), [source]);

  return renderElement(content, pragma);
};
