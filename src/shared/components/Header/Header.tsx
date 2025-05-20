'use client';

import styles from './Header.module.scss';

import { MainLogo, NotificationBell } from '@/components/icons';
import { BurgerButton, SearchableSelect } from '@/components/ui';
import { AvatarUserButton } from '@/shared/components';

export const Header = () => {
  return (
    <div className={styles.main_header}>
      <div className={styles.logo_part}>
        <MainLogo width={30} height={30} />
        CraveX
      </div>

      <div className={styles.search}>
        <SearchableSelect
          placeholder={'Монеты, токены и мем-токены'}
          options={[]}
        />
      </div>

      <div className={styles.user_container}>
        <NotificationBell
          width={27}
          height={27}
          color={'var(--button-primary-color)'}
        />
        <AvatarUserButton />
      </div>

      <div className={styles.burger_button_container}>
        <BurgerButton />
      </div>
    </div>
  );
};
