import { FC } from 'react';
import { Pragma, render } from '../render';

type Props = {
  source: string;
  pragma?: Pragma;
};

export const Parcel: FC<Props> = ({ source, pragma }) => render(source, pragma);
