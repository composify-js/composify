import { getClassNameFactory } from '@composify/utils';
import { type TextAreaPropertySpec } from '../../renderer';
import { PropertyControl } from '../PropertyControl';
import styles from './PropertyControlTextArea.module.css';

type Props = {
  name: string;
  spec: TextAreaPropertySpec<string>;
  value?: string;
  compact?: boolean;
  onChange?: (name: string, value?: string) => void;
};

const getClassName = getClassNameFactory('PropertyControlTextArea', styles);

export const PropertyControlTextArea = ({ spec, ...props }: Props) => (
  <PropertyControl<string>
    {...props}
    spec={spec}
    defaultValue={spec.default ?? ''}
    renderInput={(value, onChange) => (
      <textarea value={value} rows={3} onChange={event => onChange(event.target.value)} className={getClassName()} />
    )}
  />
);
