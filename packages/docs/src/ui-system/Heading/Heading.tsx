import type { FC, JSX, PropsWithChildren } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { variants } from './HeadingVariants';

type Props = PropsWithChildren<{
  level: number;
  className?: string[];
}> &
  VariantProps<typeof variants>;

export const Heading: FC<Props> = ({ level, className, size, weight, align, ...props }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return <HeadingTag className={variants({ className, size, weight, align })} {...props} />;
};
