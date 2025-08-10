import { createElement, type FC, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  level?: 1 | 2 | 3;
  weight?: 'semibold' | 'bold' | 'extrabold';
}>;

const TEXT_SIZE_BY_LEVEL = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
};

const FONT_WEIGHT_BY_WEIGHT = {
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

export const Heading: FC<Props> = ({ level = 1, weight = 'extrabold', children }) =>
  createElement(
    `h${level}`,
    { className: `text-neutral-900 ${FONT_WEIGHT_BY_WEIGHT[weight]} ${TEXT_SIZE_BY_LEVEL[level]}` },
    children
  );
