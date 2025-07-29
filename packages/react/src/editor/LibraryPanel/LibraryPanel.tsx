import { Catalog, Node, Parser } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { ReactNode } from 'react';
import toJsxString from 'react-element-to-jsx-string';
import { Renderer } from '../../renderer';
import { TargetType } from '../Constants';
import { Draggable } from '../Draggable';
import { SearchForm } from '../SearchForm';
import styles from './LibraryPanel.module.css';

const getClassName = getClassNameFactory('LibraryPanel', styles);

export const LibraryPanel = () => (
  <section className={getClassName()}>
    <SearchForm />
    <div className={getClassName('BlockList')}>
      {Catalog.getAll().map(([name, block]) => {
        const propertySpecs = block.props ?? {};

        const defaultProps = Object.entries(propertySpecs).reduce(
          (acc, [key, value]) =>
            value?.default && !value.optional
              ? {
                  ...acc,
                  [key]: propertySpecs[key].type === 'node' ? Parser.parse(toJsxString(value.default)) : value.default,
                }
              : acc,
          {} as Record<string, unknown>
        );

        const children = [defaultProps.children].flat().filter(child => typeof child !== 'undefined') as ReactNode;

        const node = {
          __composify__: true,
          type: name,
          props: defaultProps,
          children,
        } as Node;

        const jsxProps = Object.entries(defaultProps)
          .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
          .join(' ');

        return (
          <Draggable
            type={TargetType.Library}
            key={name}
            item={{
              ...node,
              props: defaultProps,
            }}
          >
            <Renderer source={`<${name} ${jsxProps} />`} />
          </Draggable>
        );
      })}
    </div>
  </section>
);
