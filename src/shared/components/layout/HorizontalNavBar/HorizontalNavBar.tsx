'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import styles from './HorizontalNavBar.module.scss';

const links = [
  {
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/account/assets`,
    label: 'Portfolio',
  },
  {
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/info/coins`,
    label: 'Coins',
  },
  {
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/info/about_us`,
    label: 'About us',
  },
  {
    link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/info/subscriptions`,
    label: 'Subscriptions',
  },
];

export const HorizontalNavBar = () => {
  const pathname = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${usePathname()}`;

  return (
    <>
      <div className={styles.navbar}>
        {links.map((link) => (
          <Link key={link.link + link.label} href={link.link}>
            <span
              className={clsx(
                styles.link,
                pathname === link.link && styles.active,
              )}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>
      <div className={styles.mobile_navbar}>
        {links.map((link) => (
          <Link key={link.link + link.label} href={link.link}>
            <span
              className={clsx(
                styles.link,
                pathname === link.link && styles.active,
              )}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
};
