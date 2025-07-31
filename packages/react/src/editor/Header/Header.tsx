import { getClassNameFactory } from '@composify/utils';
import { FC } from 'react';
import styles from './Header.module.css';

const getClassName = getClassNameFactory('Header', styles);

type Props = {
  title: string;
};

export const Header: FC<Props> = ({ title }) => (
  <header className={getClassName()}>
    <h1 className={getClassName('Title')}>{title}</h1>
  </header>
);
