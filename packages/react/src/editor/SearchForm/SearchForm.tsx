import { getClassNameFactory } from '@composify/utils';
import { useState } from 'react';
import styles from './SearchForm.module.css';

const getClassName = getClassNameFactory('SearchForm', styles);

export const SearchForm = () => {
  const [query, setQuery] = useState('');

  return (
    <input
      className={getClassName()}
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search component"
    />
  );
};
