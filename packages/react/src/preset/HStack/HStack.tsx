import { type FC, type PropsWithChildren } from 'react';
import { Stack, type StackProps } from '../Stack';

type Props = Omit<StackProps, 'flexDirection' | 'alignItems' | 'justifyContent'> & {
  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignVertical?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
};

export const HStack: FC<PropsWithChildren<Props>> = ({ alignHorizontal, alignVertical, ...props }) => (
  <Stack flexDirection="row" alignItems={alignVertical} justifyContent={alignHorizontal} {...props} />
);
