import type { FC, PropsWithChildren } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const variants = tv({
  base: ['flex', 'flex-row'],
  variants: {
    alignHorizontal: {
      center: 'justify-center',
      end: 'justify-end',
      start: 'justify-start',
      between: 'justify-between',
      around: 'justify-around',
    },
    alignVertical: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
});

type Props = PropsWithChildren<
  {
    flex?: number;
    gap?: number;
    width?: number | string;
    height?: number | string;
    padding?: { top: number; right: number; bottom: number; left: number };
    margin?: { top: number; right: number; bottom: number; left: number };
    background?: string;
  } & VariantProps<typeof variants>
>;

export const HStack: FC<Props> = ({
  flex,
  gap,
  width,
  height,
  padding,
  margin,
  background,
  alignHorizontal,
  alignVertical,
  ...props
}) => (
  <div
    className={variants({ alignHorizontal, alignVertical })}
    style={{
      flex,
      gap,
      width,
      height,
      paddingTop: padding?.top,
      paddingBottom: padding?.bottom,
      paddingLeft: padding?.left,
      paddingRight: padding?.right,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
      background,
    }}
    {...props}
  />
);
