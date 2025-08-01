import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import { EditingProvider } from '../EditingContext';
import { IsolatedDndProvider } from '../IsolatedDndProvider';
import { KeyDownDetector } from '../KeyDownDetector';
import { PanelLeft } from '../PanelLeft';
import { PanelRight } from '../PanelRight';
import { Theme } from '../Theme';
import { VisualEditor } from '../VisualEditor';
import { WindowProvider } from '../WindowContext';
import styles from './Editor.module.css';

const getClassName = getClassNameFactory('Editor', styles);

type Props = {
  title: string;
  source: string;
  viewports?: {
    width: number;
    label: string;
  }[];
};

export const Editor: FC<Props> = ({
  title,
  source,
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
      label: '4k - 1440px',
    },
  ],
}) => (
  <WindowProvider>
    <IsolatedDndProvider>
      <EditingProvider source={source}>
        <main className={getClassName()}>
          <PanelLeft title={title} />
          <VisualEditor viewports={viewports} />
          <PanelRight />
        </main>
        <KeyDownDetector />
        <Theme />
      </EditingProvider>
    </IsolatedDndProvider>
  </WindowProvider>
);
