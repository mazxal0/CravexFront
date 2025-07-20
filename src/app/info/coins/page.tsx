'use client';
import { useState } from 'react';

import styles from './page.module.scss';

import { List } from '@/components/ui';
import { useQueryRequest } from '@/shared/hooks';

export default function CoinsPage() {
  const { data, isLoading } = useQueryRequest({
    nameOfCache: 'coins',
    apiUrl: '',
  });

  const [query, setQuery] = useState<string>('');

  const onSearch = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <List
          onSearch={onSearch}
          isLoading={true}
          value={query}
          onHandleChange={(query) => setQuery(query)}
          className={styles.custom_list}
          isScrolling={false}
        />
      </div>
    </div>
  );
}
