'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import styles from './Header.module.scss';

import {
  MagnifierIcon,
  MainLogo,
  UserAvatarIcon,
  WalletIcon,
} from '@/components/icons';
import { IconProps } from '@/components/icons/IconProps';
import { Button } from '@/components/ui';
import api from '@/lib/axios';
import { rootStore } from '@/shared/stores';

export const Header = () => {
  const [id, setId] = useState<string | null>('');

  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(false);
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setId(rootStore.userStore.userId);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsOpenHeader(false);
      }
    };
    if (isOpenHeader) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }

    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpenHeader]);

  const openHeader = () => {
    setIsOpenHeader((prev) => !prev);
  };

  const onExit = async () => {
    try {
      await api.post(process.env.NEXT_PUBLIC_API_URL_LOG_OUT);
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  function headerText(text: string, fontSize?: number) {
    return (
      <motion.h4
        layout
        animate={{
          opacity: isOpenHeader ? 1 : 0,
          maxWidth: isOpenHeader ? 200 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          fontSize: fontSize ? `${fontSize}px` : undefined,
          transition: 'opacity 0.3s, margin-left 0.3s',
        }}
      >
        {text}
      </motion.h4>
    );
  }

  function elementLink(
    link: string,
    text: string,
    IconTSX: FC<IconProps>,
    fontSize: number = 16,
  ) {
    return (
      <Link
        onClick={() => {
          setIsOpenHeader(false);
        }}
        href={link}
        style={{ width: '100%' }}
      >
        <motion.div
          layout
          className={styles.link}
          animate={{
            scale: isOpenHeader ? 1.1 : 1,
            paddingLeft: isOpenHeader ? 10 : 15,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <div style={{ width: '30px', height: '30px' }}>
            <IconTSX width={30} height={30} color={'white'} />
          </div>
          {headerText(text, fontSize)}
        </motion.div>
      </Link>
    );
  }

  return (
    <>
      <motion.div
        className={clsx(styles.main_header, styles.desktop)}
        ref={headerRef}
        animate={{ width: isOpenHeader ? 300 : 120 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.logo_part} onClick={openHeader}>
          <div style={{ width: '50px', height: '50px' }}>
            <MainLogo width={50} height={50} />
          </div>
          {headerText('CraveX', 30)}
        </div>

        <div className={styles.icons}>
          {elementLink(`/account/assets/${id}`, 'Wallets', WalletIcon)}
          {elementLink(`/account/${id}`, 'Profile', UserAvatarIcon)}
          {/*{elementLink(`/account/settings/${id}`, 'Settings', SettingsIcon)}*/}
          {elementLink('/info/coins', 'Coins', MagnifierIcon)}
        </div>
        <motion.div
          className={styles.button_container}
          animate={{
            opacity: isOpenHeader ? 1 : 0,
          }}
          transition={{ duration: 0.4 }}
        >
          <Button onClick={onExit}>Log out</Button>
        </motion.div>
      </motion.div>
      <div className={styles.mobile_header}>
        <div className={styles.icons}>
          <Link className={styles.icon} href={`/account/assets/${id}`}>
            <WalletIcon height={25} width={25} color={'var(--primary-color)'} />
            Wallets
          </Link>
          <Link className={styles.icon} href={`/account/${id}`}>
            <UserAvatarIcon
              height={25}
              width={25}
              color={'var(--primary-color)'}
            />
            Profile
          </Link>
          <Link className={styles.icon} href={'/info/coins'}>
            <MagnifierIcon
              height={25}
              width={25}
              color={'var(--primary-color)'}
            />
            Coins
          </Link>
        </div>
      </div>
    </>
  );
};
