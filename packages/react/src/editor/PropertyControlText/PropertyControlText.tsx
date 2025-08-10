import { getClassNameFactory } from '@composify/utils';
import { type TextPropertySpec } from '../../renderer';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlText.module.css';

type Props = {
  name: string;
  spec: TextPropertySpec<string>;
  value?: string;
  compact?: boolean;
  onChange?: (name: string, value?: string) => void;
};

const getClassName = getClassNameFactory('PropertyControlText', styles);

export const PropertyControlText = ({ spec, ...props }: Props) => (
  <PropertyControl<string>
    {...props}
    spec={spec}
    defaultValue={spec.default ?? ''}
    renderInput={(value, onChange) => (
      <input type="text" value={value} onChange={event => onChange(event.target.value)} className={getClassName()} />
    )}
  />
);
