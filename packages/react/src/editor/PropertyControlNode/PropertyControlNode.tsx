import { Node, NodePropertySpec, Parser } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { ReactNode } from 'react';
import toJsxString from 'react-element-to-jsx-string';
import { Droppable } from '../Droppable';
import { useEditing } from '../EditingContext';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlNode.module.css';

type Props = {
  name: string;
  spec: NodePropertySpec<ReactNode>;
  value?: Node | null;
  compact?: boolean;
  onChange?: (name: string, value?: Node | null) => void;
};

const getClassName = getClassNameFactory('PropertyControlNode', styles);

export const PropertyControlNode = ({ spec, ...props }: Props) => {
  const { activeBlock } = useEditing();

  if (!activeBlock) {
    return null;
  }

  return (
    <PropertyControl<ReactNode, Node | null>
      {...props}
      spec={spec}
      defaultValue={spec.default ? Parser.parse(toJsxString(spec.default)) : null}
      renderInput={(value, onChange) => (
        <div className={getClassName()}>
          <Droppable item={activeBlock} index={0} onDrop={onChange} />
        </div>
      )}
    />
  );
};
