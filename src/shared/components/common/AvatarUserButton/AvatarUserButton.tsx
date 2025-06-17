'use client';
import { FC, useEffect, useRef, useState } from 'react';

import styles from './AvatarUserButton.module.scss';

import { UserAvatarIcon } from '@/components/icons';
import { Button } from '@/components/ui';

export const AvatarUserButton: FC = () => {
  const [isOpenUserMenu, setIsOpenUserMenu] = useState<boolean>(false);
  const avatarUserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarUserRef.current &&
        !avatarUserRef.current.contains(event.target as Node)
      ) {
        setIsOpenUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
      ref={avatarUserRef}
    >
      <UserAvatarIcon
        width={30}
        height={30}
        color={'var(--gray-color)'}
        onClick={() => setIsOpenUserMenu((prev) => !prev)}
      />

      {isOpenUserMenu && (
        <div className={styles.menu}>
          <div>
            <Button formatType={'outline'}>Внешний вид</Button>
          </div>
          <br />
          <div>Выйти</div>
        </div>
      )}
    </div>
  );
};
