import { type FC, type PropsWithChildren, useState } from 'react';
import { getClassNameFactory } from '../../utils';
import { ViewportControl } from '../ViewportControl';
import { ViewportScaler } from '../ViewportScaler';
import styles from './ViewportManager.module.css';

const getClassName = getClassNameFactory('ViewportManager', styles);

type Props = PropsWithChildren<{
  viewports?: {
    width: number;
    label: string;
    initial?: boolean;
  }[];
}>;

export const ViewportManager: FC<Props> = ({
  viewports = [
    {
      width: 320,
      label: 'Mobile S - 320px',
    },
    {
      width: 375,
      label: 'Mobile M - 375px',
    },
    {
      width: 425,
      label: 'Mobile L - 425px',
      initial: true,
    },
    {
      width: 768,
      label: 'Tablet - 768px',
    },
    {
      width: 1024,
      label: 'Laptop - 1024px',
    },
    {
      width: 1440,
      label: 'Desktop - 1440px',
    },
    {
      width: 2560,
      label: '4K - 2560px',
    },
  ],
  children,
}) => {
  const initialViewport = viewports.find((viewport) => viewport.initial) ?? viewports[0];
  const [width, setWidth] = useState(initialViewport.width);

  return (
    <section className={getClassName()}>
      <ViewportControl viewports={viewports} selectedWidth={width} onClick={setWidth} />
      <div className={getClassName('Content')}>
        <ViewportScaler width={width}>{children}</ViewportScaler>
      </div>
    </section>
  );
};
