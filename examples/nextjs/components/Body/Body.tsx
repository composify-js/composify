import { type FC, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  color?: string;
  weight?: 'light' | 'normal';
  margin?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
}>;

const FONT_WEIGHT_BY_WEIGHT = {
  light: 'font-light',
  normal: 'font-normal',
};

export const Body: FC<Props> = ({ color = '#1E1E1E', weight = 'normal', margin, children }) => (
  <p
    className={`text-xl ${FONT_WEIGHT_BY_WEIGHT[weight]}`}
    style={{
      color,
      marginTop: margin?.top,
      marginBottom: margin?.bottom,
      marginLeft: margin?.left,
      marginRight: margin?.right,
    }}
  >
    {children}
  </p>
);
