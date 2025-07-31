import { Block, Node, Parser } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { FC, ReactNode } from 'react';
import toJsxString from 'react-element-to-jsx-string';
import { Renderer } from '../../renderer';
import { TargetType } from '../Constants';
import { ContentScaler } from '../ContentScaler';
import { Draggable } from '../Draggable';
import styles from './LibraryBlockGroup.module.css';

const getClassName = getClassNameFactory('LibraryBlockGroup', styles);

type Props = {
  category: string;
  blocks: Block[];
};

export const LibraryBlockGroup: FC<Props> = ({ category, blocks }) => (
  <div className={getClassName()}>
    <h4 className={getClassName('Category')}>{category}</h4>
    <div className={getClassName('BlockList')}>
      {blocks.map(block => {
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
          type: block.name,
          props: defaultProps,
          children,
        } as Node;

        const jsxProps = Object.entries(defaultProps)
          .map(([key, value]) => `${key}={${JSON.stringify(value)}}`)
          .join(' ');

        return (
          <div key={block.name} className={getClassName('BlockItem')}>
            <Draggable
              type={TargetType.Library}
              item={{
                ...node,
                props: defaultProps,
              }}
            >
              <div className={getClassName('BlockItemPreview')}>
                <ContentScaler width={102} height={102}>
                  <Renderer source={`<${block.name} ${jsxProps} />`} />
                </ContentScaler>
              </div>
            </Draggable>
            <p className={getClassName('BlockName')}>{block.name}</p>
          </div>
        );
      })}
    </div>
  </div>
);
