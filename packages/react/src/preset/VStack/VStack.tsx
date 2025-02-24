import { FC, PropsWithChildren, useMemo } from 'react';
import { Stack, StackProps } from '../Stack';

type Props = Omit<StackProps, 'flexDirection' | 'alignItems' | 'justifyContent'> & {
  alignHorizontal?: 'center' | 'end' | 'start' | 'stretch';
  alignVertical?: 'between' | 'center' | 'end' | 'start';
};

export const VStack: FC<PropsWithChildren<Props>> = ({ alignHorizontal, alignVertical, ...props }) => {
  const alignItems = useMemo(() => {
    switch (alignHorizontal) {
      case 'center':
        return 'center';
      case 'end':
        return 'flex-end';
      case 'start':
        return 'flex-start';
      case 'stretch':
        return 'stretch';
    }
  }, [alignHorizontal]);

  const justifyContent = useMemo(() => {
    switch (alignVertical) {
      case 'between':
        return 'space-between' as const;
      case 'center':
        return 'center' as const;
      case 'end':
        return 'flex-end' as const;
      case 'start':
        return 'flex-start' as const;
    }
  }, [alignVertical]);

  return <Stack flexDirection="column" alignItems={alignItems} justifyContent={justifyContent} {...props} />;
};
