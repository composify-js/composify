import { FC, PropsWithChildren, useMemo } from 'react';
import { Stack, StackProps } from '../Stack';

type Props = Omit<StackProps, 'flexDirection' | 'alignItems' | 'justifyContent'> & {
  alignHorizontal?: 'between' | 'center' | 'end' | 'start';
  alignVertical?: 'center' | 'end' | 'start' | 'stretch';
};

export const HStack: FC<PropsWithChildren<Props>> = ({ alignHorizontal, alignVertical, ...props }) => {
  const alignItems = useMemo(() => {
    switch (alignVertical) {
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      case 'start':
        return 'flex-start';
      case 'stretch':
        return 'stretch';
    }
  }, [alignVertical]);

  const justifyContent = useMemo(() => {
    switch (alignHorizontal) {
      case 'between':
        return 'space-between' as const;
      case 'center':
        return 'center' as const;
      case 'end':
        return 'flex-end' as const;
      case 'start':
        return 'flex-start' as const;
    }
  }, [alignHorizontal]);

  return <Stack flexDirection="row" alignItems={alignItems} justifyContent={justifyContent} {...props} />;
};
