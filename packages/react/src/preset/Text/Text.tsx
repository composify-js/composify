import type { FC, JSX, PropsWithChildren } from 'react';
import { createVariants } from '../../utils';
import styles from './Text.module.css';

type Props = PropsWithChildren<{
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: 'primary' | 'on-primary' | 'secondary' | 'on-secondary' | 'on-surface' | 'on-surface-variant' | string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  align?: 'left' | 'center' | 'right';
  weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
}>;

const variants = createVariants(styles);

export const Text: FC<Props> = ({ className, level, color, size, align, weight, ...props }) => {
  const Tag = level ? (`h${level}` as keyof JSX.IntrinsicElements) : 'p';

  return (
    <Tag
      className={variants('text', {
        className,
        size,
        align,
        weight,
        ...(color?.startsWith('#') ? {} : { color }),
      })}
      style={{
        ...(color?.startsWith('#') ? { color } : {}),
      }}
      {...props}
    />
  );
};
