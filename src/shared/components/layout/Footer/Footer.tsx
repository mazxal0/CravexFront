'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Footer.module.scss';

import { MainLogo, TelegramIcon, TwitterIcon } from '@/components/icons';

export const Footer = () => {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const links = [
    { href: '/account/assets', label: 'Portfolio' },
    { href: '/info/coins', label: 'Coins' },
    { href: '/info/about_us', label: 'About us' },
    { href: '/info/subscriptions', label: 'Subscriptions' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Logo + описание */}
        <div className={`${styles.section} ${styles.logo}`}>
          <div className={styles.container_logo_with_social}>
            <div className={styles.container_logo}>
              <MainLogo width={60} height={60} />
              <div>
                <h3>CraveX</h3>
                <p>Your all-in-one crypto portfolio manager</p>
              </div>
            </div>
            <div className={styles.social}>
              <a
                href="https://x.com/CraveX_news"
                target={'_blank'}
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://t.me/CravexNews"
                target={'_blank'}
                aria-label="Telegram"
              >
                <TelegramIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Быстрые ссылки */}
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul className={styles.list}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={pathname === link.href ? styles.active : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Контакты */}
        <div className={styles.section}>
          <h4>Contact</h4>
          <p>
            Email us at{' '}
            <a href="mailto:cravexbank@gmail.com" className={styles.link}>
              cravexbank@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Нижняя полоса */}
      <div className={styles.bottom}>
        <p>© {year} CraveX. All rights reserved.</p>
      </div>
    </footer>
  );
};
