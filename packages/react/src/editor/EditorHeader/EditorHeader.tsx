import { type FC } from 'react';
import { getClassNameFactory } from '../../utils';
import styles from './EditorHeader.module.css';

const getClassName = getClassNameFactory('EditorHeader', styles);

type Props = {
  title: string;
};

export const EditorHeader: FC<Props> = ({ title }) => (
  <header className={getClassName()}>
    <h1 className={getClassName('Title')}>{title}</h1>
  </header>
);
