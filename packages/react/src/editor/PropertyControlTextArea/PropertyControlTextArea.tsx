import type { TextAreaPropertySpec } from '@composify/react/renderer';
import { Textarea } from '@composify/react/ui';
import { PropertyControl } from '../PropertyControl';

type Props = {
  name: string;
  spec: TextAreaPropertySpec<string>;
  value?: string;
  compact?: boolean;
  onChange?: (name: string, value?: string) => void;
};

export const PropertyControlTextArea = ({ spec, ...props }: Props) => (
  <PropertyControl<string>
    {...props}
    spec={spec}
    defaultValue={spec.default ?? ''}
    renderInput={(value, onChange) => (
      <Textarea
        rows={5}
        placeholder={spec.placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    )}
  />
);
