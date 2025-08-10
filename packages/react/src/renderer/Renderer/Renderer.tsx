import { createElement, type FC, Fragment, type ReactNode, useMemo } from 'react';
import * as Catalog from '../Catalog';
import { type Node } from '../NodeManager';
import * as Parser from '../Parser';

export type Pragma = {
  jsx: (
    type: Parameters<typeof createElement>[0],
    props: Parameters<typeof createElement>[1],
    info: Node,
    ...children: ReactNode[]
  ) => ReactNode;
};

const DEFAULT_PRAGMA: Pragma = {
  jsx: (type, props, _, ...children) => createElement(type, props, ...children),
};

const renderElement = (node: Node, pragma: Pragma): ReactNode => {
  const spec = Catalog.get(node.type);

  if (!spec) {
    return renderFragment(node, pragma);
  }

  return pragma.jsx(
    spec?.component ?? Fragment,
    {
      ...Object.entries(node.props).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value && typeof value === 'object' && '__composify__' in value ? renderElement(value, pragma) : value,
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

const renderFragment = (node: Node, pragma: Pragma): ReactNode =>
  pragma.jsx(
    Fragment,
    {},
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

type Props = {
  source: string | Node;
  pragma?: Pragma;
};

export const Renderer: FC<Props> = ({ source, pragma = DEFAULT_PRAGMA }) => {
  const content = useMemo(() => (typeof source === 'string' ? Parser.parse(source) : source), [source]);

  return renderElement(content, pragma);
};
