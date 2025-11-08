import { SearchIcon } from 'lucide-react';
import { type FC, type ReactNode, useState } from 'react';
import styles from './SearchForm.module.css';

type Props = {
  children: (query: string) => ReactNode;
};

export const SearchForm: FC<Props> = ({ children }) => {
  const [query, setQuery] = useState('');

  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          name="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search component"
        />
        <SearchIcon size={16} />
      </div>
      {children(query)}
    </>
  );
};
