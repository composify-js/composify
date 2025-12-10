import { createVariants } from '@composify/react/utils';
import type { ComponentProps, FC } from 'react';
import styles from './Textarea.module.css';

const variants = createVariants(styles);

type Props = ComponentProps<'textarea'>;

export const Textarea: FC<Props> = ({ className, ...props }) => (
  <textarea className={variants('textarea', { className })} {...props} />
);
