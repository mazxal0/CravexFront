/* FirstPage.jsx */
'use client';

import { motion } from 'framer-motion';
import React from 'react';

import styles from './page.module.scss';

// Анимационные настройки
const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
});
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

// Метрики CraveX (пример)
const metrics = [
  { label: 'Пользователи', value: '1.2K+' },
  { label: 'Поддерживаемые сети', value: '4' },
  { label: 'Активы отслежены', value: '50K+' },
  { label: 'Интеграции', value: '10+' },
];
const ecosystem = [
  {
    name: 'Hub',
    desc: 'Агрегатор Web3-активов без управления',
    link: './auth/login',
    icon: 'https://source.unsplash.com/200x200/?network',
  },
  {
    name: 'Wallet',
    desc: 'TON, ETH, Solana, BNB кошелёк',
    link: 'https://t.me/CraveXWalletBot',
    icon: 'https://source.unsplash.com/200x200/?wallet',
  },
  {
    name: 'Bank',
    desc: 'Крипто-банк с картами и fiat',
    link: 'https://t.me/CraveXBankBot',
    icon: 'https://source.unsplash.com/200x200/?bank',
  },
  {
    name: 'Exchange',
    desc: 'Низкие комиссии и многоактивность',
    link: 'https://t.me/CraveXExchangeBot',
    icon: 'https://source.unsplash.com/200x200/?exchange',
  },
  {
    name: 'AI Agent',
    desc: 'ИИ для управления вашим портфелем',
    link: 'https://t.me/CraveXAI_Bot',
    icon: 'https://source.unsplash.com/200x200/?ai',
  },
];

export default function FirstPage() {
  return (
    <main className={styles.container}>
      {/* Hero */}
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={fadeIn(0)}
      >
        <h1 className={styles.heroTitle}>
          CraveX — DeFi’s Pro Trading Platform
        </h1>
        <p className={styles.heroSubtitle}>
          Объединяем свободу децентрализации с глубокой аналитикой и низкими
          комиссиями.
        </p>
        <motion.div className={styles.heroBtns} variants={fadeIn(0.4)}>
          <a href="https://t.me/CraveXHubBot" className={styles.btnPrimary}>
            Начать сейчас
          </a>
          <a href="#metrics" className={styles.btnSecondary}>
            Узнать больше
          </a>
        </motion.div>
      </motion.section>

      {/* Metrics */}
      <motion.section
        id="metrics"
        className={styles.statsSection}
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {metrics.map((item, i) => (
          <motion.div
            key={i}
            className={styles.statCard}
            variants={fadeIn(i * 0.3)}
          >
            <div className={styles.statValue}>{item.value}</div>
            <div className={styles.statLabel}>{item.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* Ecosystem */}
      <section className={styles.sectionAlt}>
        <motion.h2
          className={styles.sectionTitle}
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
        >
          Наша Экосистема
        </motion.h2>
        <motion.div
          className={styles.ecosystemGrid}
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          {ecosystem.map((item, i) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={fadeIn(i * 0.2)}
              whileHover={{ scale: 1.05 }}
            >
              <img src={item.icon} alt="" className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>{item.name}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
              <a href={item.link} className={styles.cardBtn}>
                Ранний доступ
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <motion.section
        className={styles.ctaBanner}
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.2)}
      >
        <h2>Готовы погрузиться в DeFi?</h2>
        <a href="https://t.me/CraveXHubBot" className={styles.btnPrimary}>
          Присоединиться к бета
        </a>
      </motion.section>
    </main>
  );
}
