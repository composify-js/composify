import { Catalog, Parser } from '@composify/core';
import { createElement, ReactNode } from 'react';

const renderElement = (node: Parser.Node, key?: string | number): ReactNode => {
  const [type, props, ...children] = node;

  const { component } = Catalog.get(type);

  return createElement(
    component,
    {
      key,
      ...props,
    },
    children.map((child, index) => (Array.isArray(child) ? renderElement(child, index) : child))
  );
};

export const render = (source: string): ReactNode => {
  const content = Parser.parse(source);

  return renderElement(content);
};
