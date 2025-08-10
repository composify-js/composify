import { getClassNameFactory } from '@composify/utils';
import { type ReactNode } from 'react';
import toJsxString from 'react-element-to-jsx-string';
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

const getClassName = getClassNameFactory('PropertyControlNode', styles);

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
        <div className={getClassName()}>
          {value ? (
            <ContentScaler width={1024} height={1024}>
              <Renderer source={value} />
            </ContentScaler>
          ) : (
            <Droppable item={activeBlock} index={0} onDrop={onChange}>
              <p className={getClassName('Placeholder')}>Drop here</p>
            </Droppable>
          )}
          {value && (
            <button className={getClassName('RemoveButton')} onClick={() => onChange(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 640 640">
                <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
              </svg>
            </button>
          )}
        </div>
      )}
    />
  );
};
