import { useState } from 'react';
import { ClassNames } from '../Constants';

export const SearchForm = () => {
  const [query, setQuery] = useState('');

  return (
    <input
      className={ClassNames.SearchForm}
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="Search component"
    />
  );
};
