'use client';
import { observer } from 'mobx-react-lite'; // если ты используешь mobx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import clsx from 'clsx';

import styles from './HorizontalNavBar.module.scss';

import { MainLogo } from '@/components/icons';
import { rootStore } from '@/shared/stores';

export const HorizontalNavBar = observer(function HorizontalNavBar() {
  const pathname = usePathname();
  const userId = rootStore.userStore.userId;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // пока не mounted — возвращаем null, чтобы сервер и клиент оба рендерили пустоту
  if (!mounted) return null;
  // Пока нет userId — не рендерим список ссылок,
  // но возвращаем точно такую же разметку-контейнеры.
  const links = userId
    ? [
        { href: `/account/assets/${userId}`, label: 'Portfolio' },
        { href: `/info/coins`, label: 'Coins' },
        { href: `/info/about_us`, label: 'About us' },
        { href: `/info/subscriptions`, label: 'Subscriptions' },
      ]
    : [
        { href: '/account/assets/123', label: 'Portfolio' },
        { href: '/info/coins', label: 'Coins' },
        { href: '/info/about_us', label: 'About us' },
        { href: '/info/subscriptions', label: 'Subscriptions' },
      ];

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <MainLogo width={30} height={30} />
        </div>
        {links.map(({ href, label }, idx) => (
          <Link key={idx} href={href}>
            <span
              className={clsx(
                styles.link,
                userId && pathname === href && styles.active,
              )}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
      <div className={styles.mobile_navbar}>
        {links.map(({ href, label }, idx) => (
          <Link key={idx} href={href}>
            <span
              className={clsx(
                styles.link,
                userId && pathname === href && styles.active,
              )}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
});
