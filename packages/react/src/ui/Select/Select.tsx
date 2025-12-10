import { createVariants } from '@composify/react/utils';
import type { ComponentProps, FC } from 'react';
import styles from './Select.module.css';

const variants = createVariants(styles);

type Props = ComponentProps<'select'> & {
  options: {
    label: string;
    value: number | string;
  }[];
};

export const Select: FC<Props> = ({ className, options, ...props }) => (
  <select className={variants('select', { className })} {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
