import { NodePropertySpec } from '@composify/core';
import { getClassNameFactory } from '@composify/utils';
import { ReactNode } from 'react';
import { Droppable } from '../Droppable';
import { useEditing } from '../EditingContext';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlNode.module.css';

type Props = {
  name: string;
  spec: NodePropertySpec<ReactNode>;
  value?: ReactNode;
  compact?: boolean;
  onChange?: (name: string, value?: ReactNode) => void;
};

const getClassName = getClassNameFactory('PropertyControlNode', styles);

export const PropertyControlNode = ({ spec, ...props }: Props) => {
  const { activeBlock } = useEditing();

  if (!activeBlock) {
    return null;
  }

  return (
    <PropertyControl<ReactNode>
      {...props}
      spec={spec}
      defaultValue={spec.default}
      renderInput={value => {
        console.log(value);
        return (
          <div className={getClassName()}>
            <Droppable item={activeBlock} index={0} />
          </div>
        );
      }}
    />
  );
};
