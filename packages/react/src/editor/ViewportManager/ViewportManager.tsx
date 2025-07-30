import { getClassNameFactory } from '@composify/utils';
import { FC, PropsWithChildren, useState } from 'react';
import { ViewportControl, ViewportControlProps } from '../ViewportControl';
import { ViewportScaler } from '../ViewportScaler';
import styles from './ViewportManager.module.css';

type Props = PropsWithChildren<Pick<ViewportControlProps, 'viewports'>>;

const getClassName = getClassNameFactory('ViewportManager', styles);

export const ViewportManager: FC<Props> = ({ children }) => {
  const [width, setWidth] = useState(375);

  return (
    <section className={getClassName()}>
      <ViewportControl onClick={setWidth} />
      <div className={getClassName('Content')}>
        <ViewportScaler width={width}>{children}</ViewportScaler>
      </div>
    </section>
  );
};
