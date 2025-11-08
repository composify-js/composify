import { XIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import toJsxString from 'react-element-to-jsx-string';
import { IconButton, Text } from '../../preset';
import { type Node, type NodePropertySpec, Parser, Renderer } from '../../renderer';
import { ContentScaler } from '../ContentScaler';
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

export const PropertyControlNode = ({ spec, ...props }: Props) => {
  const { activeBlock } = useEditing();

  if (!activeBlock || props.name === 'children') {
    return null;
  }

  return (
    <PropertyControl<ReactNode, Node | null>
      {...props}
      spec={spec}
      defaultValue={spec.default ? Parser.parse(toJsxString(spec.default)) : null}
      renderInput={(value, onChange) => (
        <div className={styles.container}>
          {value ? (
            <ContentScaler width={1024} height={1024}>
              <Renderer source={value} />
            </ContentScaler>
          ) : (
            <Droppable item={activeBlock} index={0} onDrop={onChange}>
              <Text size="xs" color="on-surface-variant" className={styles.placeholder}>
                Drop here
              </Text>
            </Droppable>
          )}
          {value && (
            <IconButton size="xs" onClick={() => onChange(null)} className={styles.remove}>
              <XIcon />
            </IconButton>
          )}
        </div>
      )}
    />
  );
};
