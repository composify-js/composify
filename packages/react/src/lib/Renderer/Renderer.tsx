import { Catalog, Parser } from '@composify/core';
import { createElement, FC, ReactNode, useMemo } from 'react';

export type Pragma = {
  jsx: (type: string, props: Record<string, unknown>, ...children: ReactNode[]) => ReactNode;
};

const renderElement = (node: Parser.Node, pragma: Pragma): ReactNode => {
  const [type, props, ...children] = node;

  const { component } = Catalog.get(type);

  return pragma.jsx(
    component,
    props,
    children.map((child, index) =>
      Array.isArray(child) ? renderElement([child[0], { ...child[1], key: index }, child[2]], pragma) : child
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
