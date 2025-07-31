import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import styles from './ViewportControl.module.css';

export type Props = {
  viewports: {
    width: number;
    label: string;
  }[];
  onClick: (width: number) => void;
};

const getClassName = getClassNameFactory('ViewportControl', styles);

export const ViewportControl: FC<Props> = ({ viewports, onClick }) => (
  <div className={getClassName()}>
    {viewports
      .sort((a, b) => b.width - a.width)
      .map(viewport => (
        <div
          role="button"
          key={viewport.width}
          className={getClassName('ViewportItem')}
          style={{ minWidth: viewport.width }}
          onClick={() => onClick(viewport.width)}
        >
          <div className={getClassName('Highlight')} />
          <span className={getClassName('Label')}>{viewport.label}</span>
        </div>
      ))}
  </div>
);
