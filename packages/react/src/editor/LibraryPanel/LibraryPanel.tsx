import { Catalog, Parser } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { createElement } from 'react';
import toJsxString from 'react-element-to-jsx-string';
import { Pragma, Renderer } from '../../renderer';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { SearchForm } from '../SearchForm';
import styles from './LibraryPanel.module.css';

const getClassName = getClassNameFactory('LibraryPanel', styles);

const pragma: Pragma = {
  jsx: (_, props, node) => {
    const block = Catalog.get(node.type);
    const propertySpecs = block.props ?? {};

    const defaultProps = Object.entries(propertySpecs).reduce(
      (acc, [key, value]) =>
        value?.default && !value.optional
          ? {
              ...acc,
              [key]: propertySpecs[key].type === 'node' ? Parser.parse(toJsxString(value.default)) : value.default,
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
          className: getClassName('BlockItem'),
        },
        node.type
      )
    );
  },
};

export const LibraryPanel = () => (
  <section className={getClassName()}>
    <SearchForm />
    <div className={getClassName('BlockList')}>
      {Catalog.getAll().map(([name]) => (
        <Renderer source={`<${name} />`} key={name} pragma={pragma} />
      ))}
    </div>
  </section>
);
