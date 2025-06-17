'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';

import styles from './Header.module.scss';

import { MainLogo, UserAvatarIcon, WalletIcon } from '@/components/icons';
import { IconProps } from '@/components/icons/IconProps';
import { Button } from '@/components/ui';
import api from '@/lib/axios';
import { rootStore } from '@/shared/stores';

export const Header = () => {
  const [id, setId] = useState<string | null>(null);
  const [isOpenHeader, setIsOpenHeader] = useState<boolean>(false);
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getId = async () => {
      setId(await rootStore.userStore.getUserId());
    };
    getId();
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
          // marginLeft: isOpenHeader ? 10 : -20,
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
      <Link href={link} style={{ width: '100%' }}>
        <motion.div
          layout
          className={styles.link}
          animate={{
            scale: isOpenHeader ? 1.1 : 1,
            paddingLeft: isOpenHeader ? 10 : 15,
          }}
          transition={{
            // gap: { duration: 0.3 },
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
    <motion.div
      className={styles.main_header}
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
      </div>

      {/*<div className={styles.search}>*/}
      {/*  <SearchableSelect*/}
      {/*    placeholder={'Монеты, токены и мем-токены'}*/}
      {/*    options={[]}*/}
      {/*  />*/}
      {/*</div>*/}

      {/*<div className={styles.user_container}>*/}
      {/*  <div className={styles.image_icon}>*/}
      {/*    <NotificationBell*/}
      {/*      width={27}*/}
      {/*      height={27}*/}
      {/*      color={'var(--button-primary-color)'}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*  <div className={styles.image_icon}>*/}
      {/*    <AvatarUserButton />*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className={styles.burger_button_container}>*/}
      {/*  <BurgerButton />*/}
      {/*</div>*/}
      <motion.div
        className={styles.button_container}
        // animate={{ maxWidth: isOpenHeader ? '100%' : '0px' }}
        animate={{
          // maxWidth: isOpenHeader ? '100%' : '0px',
          opacity: isOpenHeader ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        <Button onClick={onExit}>Log out</Button>
      </motion.div>
    </motion.div>
  );
};
