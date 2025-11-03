/** biome-ignore-all lint/suspicious/noExplicitAny: for arbitrary values */
import { Segment } from '../../preset';
import type { RadioPropertySpec } from '../../renderer';
import { PropertyControl } from '../PropertyControl/PropertyControl';

type Props = {
  name: string;
  spec: RadioPropertySpec<any>;
  value?: any;
  compact?: boolean;
  onChange?: (name: string, value?: any) => void;
};

export const PropertyControlRadio = ({ name, spec, ...props }: Props) => (
  <PropertyControl<any>
    {...props}
    name={name}
    spec={spec}
    defaultValue={spec.default}
    renderInput={(value, onChange) =>
      'render' in spec ? (
        spec.render(value, onChange)
      ) : (
        <Segment size="sm" options={spec.options} value={value} onChange={onChange} />
      )
    }
  />
);
