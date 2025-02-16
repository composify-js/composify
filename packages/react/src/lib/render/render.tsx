import { Catalog, Parser } from '@composify/core';
import { Attributes, createElement, ReactNode } from 'react';

export type Pragma = {
  jsx: (type: string, props: Attributes | null, ...children: ReactNode[]) => ReactNode;
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

export const render = (source: string, pragma: Pragma = { jsx: createElement }): ReactNode => {
  const content = Parser.parse(source);

  return renderElement(content, pragma);
};
