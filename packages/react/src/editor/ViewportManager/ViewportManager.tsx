import { getClassNameFactory } from '@composify/utils';
import { FC, PropsWithChildren, useState } from 'react';
import { ViewportControl } from '../ViewportControl';
import { ViewportScaler } from '../ViewportScaler';
import styles from './ViewportManager.module.css';

const getClassName = getClassNameFactory('ViewportManager', styles);

type Props = PropsWithChildren<{
  viewports: {
    width: number;
    label: string;
  }[];
}>;

export const ViewportManager: FC<Props> = ({ viewports, children }) => {
  const [width, setWidth] = useState(viewports[0].width);

  return (
    <section className={getClassName()}>
      <ViewportControl viewports={viewports} selectedWidth={width} onClick={setWidth} />
      <div className={getClassName('Content')}>
        <ViewportScaler width={width}>{children}</ViewportScaler>
      </div>
    </section>
  );
};
