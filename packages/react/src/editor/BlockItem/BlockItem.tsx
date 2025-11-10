import { type Block, type Node, Parser, Renderer } from '@composify/react/renderer';
import { Text } from '@composify/react/ui';
import type { ReactNode } from 'react';
import toJsxString from 'react-element-to-jsx-string';
import { TargetType } from '../Constants';
import { ContentScaler } from '../ContentScaler';
import { Draggable } from '../Draggable';
import styles from './BlockItem.module.css';

type Props = {
  block: Block;
};

export const BlockItem = ({ block }: Props) => {
  const propertySpecs = block.props ?? {};

  const defaultProps = Object.entries(propertySpecs).reduce(
    (acc, [key, value]) => {
      if (value?.hasDefault) {
        acc[key] = propertySpecs[key].type === 'node' ? Parser.parse(toJsxString(value.default)) : value.default;
      }

      return acc;
    },
    {} as Record<string, unknown>,
  );

  const children = [defaultProps.children].flat().filter((child) => typeof child !== 'undefined') as ReactNode;

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
    <div className={styles.container}>
      <Draggable type={TargetType.Library} item={node}>
        <div className={styles.preview}>
          <ContentScaler width={1024} height={1024}>
            <Renderer source={`<${block.name} ${jsxProps} />`} />
          </ContentScaler>
        </div>
      </Draggable>
      <Text size="xs" color="on-surface" className={styles.name}>
        {block.name}
      </Text>
    </div>
  );
};
