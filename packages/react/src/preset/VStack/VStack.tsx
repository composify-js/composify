import { type FC, type PropsWithChildren } from 'react';
import { Stack, type StackProps } from '../Stack';

type Props = Omit<StackProps, 'flexDirection' | 'alignItems' | 'justifyContent'> & {
  alignVertical?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignHorizontal?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
};

export const VStack: FC<PropsWithChildren<Props>> = ({ alignVertical, alignHorizontal, ...props }) => (
  <Stack flexDirection="column" alignItems={alignHorizontal} justifyContent={alignVertical} {...props} />
);
