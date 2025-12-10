import type { ComponentProps, FC } from 'react';

type Props = ComponentProps<'img'>;

export const Image: FC<Props> = (props) => <img {...props} />;
