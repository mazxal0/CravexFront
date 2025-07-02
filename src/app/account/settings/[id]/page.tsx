'use client';
import styles from './page.module.scss';

import { SwitchButton } from '@/components/ui';
import { useLocalStorage } from '@/shared/hooks';

export default function SettingsPage() {
  const { state, setState } = useLocalStorage<'dark' | 'light'>({
    defaultValue: 'dark',
    key: 'theme',
    onAction: (value) => {
      const root = document.documentElement;
      if (value === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    },
  });

  return (
    <div className={styles.page}>
      <div className={styles.theme}>
        <p>Theme: {state}</p>
        <SwitchButton<'dark' | 'light'>
          checked={state === 'dark'}
          checkedValue={'dark'}
          uncheckedValue={'light'}
          onChange={setState}
          aria-label={'Dark Mode'}
        />
      </div>
    </div>
  );
}
