import type { FC, ReactNode } from 'react';
import toJsxString from 'react-element-to-jsx-string';
import { type Block, type Node, Parser, Renderer } from '../../renderer';
import { getClassNameFactory } from '../../utils';
import { TargetType } from '../Constants';
import { ContentScaler } from '../ContentScaler';
import { Draggable } from '../Draggable';
import styles from './BlockGroup.module.css';

const getClassName = getClassNameFactory('BlockGroup', styles);

type Props = {
  category: string;
  blocks: Block[];
};

export const BlockGroup: FC<Props> = ({ category, blocks }) => (
  <div className={getClassName()}>
    <h4 className={getClassName('Category')}>{category}</h4>
    <div className={getClassName('BlockList')}>
      {blocks.map((block) => {
        const propertySpecs = block.props ?? {};

        const defaultProps = Object.entries(propertySpecs).reduce(
          (acc, [key, value]) => {
            if (value?.hasDefault) {
              acc[key] =
                propertySpecs[key].type === 'node'
                  ? Parser.parse(toJsxString(value.default))
                  : value.default;
            }

            return acc;
          },
          {} as Record<string, unknown>,
        );

        const children = [defaultProps.children]
          .flat()
          .filter((child) => typeof child !== 'undefined') as ReactNode;

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
                <ContentScaler width={1024} height={1024}>
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
