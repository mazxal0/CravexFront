// FirstPage.jsx
'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useCallback, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// UI components
import styles from './page.module.scss';

import animationData from '@/../public/crypto-hero.json';
import { Button } from '@/components/ui/Button/Button';

const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

// Animations
const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
});
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// Example data
const features = [
  {
    title: 'Аналитика',
    desc: 'Глубокие данные по большинству активов',
    icon: '📊',
  },
  { title: 'Безопасность', desc: 'Ваши ключи хранятся у вас', icon: '🔒' },
  {
    title: 'Мульти-сеть',
    desc: 'Поддержка Ethereum, Solana, TON и других',
    icon: '🔗',
  },
];
const networks = ['Ethereum', 'Solana', 'BNB Smart Chain', 'TON'];

export default function FirstPage() {
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    particles: {
      number: { value: 50 },
      color: { value: '#FF9360' },
      move: { enable: true, speed: 0.5, outModes: { default: 'bounce' } },
      links: { enable: true, color: '#3B82F6', distance: 120 },
    },
    interactivity: { events: { onHover: { enable: true, mode: 'repulse' } } },
  } as const;

  return (
    <div className={styles.root}>
      <Particles
        init={particlesInit}
        options={particlesOptions}
        className={styles.particles}
      />

      <header className={styles.header}>
        <div className={styles.logo}>CraveX</div>
        <nav className={styles.nav}></nav>
      </header>

      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div className={styles.heroText} variants={fadeIn(0.2)}>
          <h1>Добро пожаловать в CraveX Hub</h1>
          <p>Агрегатор DeFi-активов с профессиональными инструментами</p>
          <div className={styles.heroActions}>
            <Button formatType={'primary'} formatSize="lg">
              Начать сейчас
            </Button>
            <Button formatType="outline" formatSize="lg">
              Узнать больше
            </Button>
          </div>
        </motion.div>
        <motion.div className={styles.heroAnim} variants={fadeIn(0.4)}>
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: 280, height: 280 }}
          />
        </motion.div>
      </motion.section>

      <motion.section
        className={styles.features}
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <h2 className={styles.sectionTitle}>Наши возможности</h2>
        <div className={styles.featureGrid}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className={styles.featureCard}
              variants={fadeIn(i * 0.2)}
            >
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className={styles.networkSelector}>
        <h2>Выберите сеть</h2>
        {/*<SearchableSelect*/}
        {/*  options={networks}*/}
        {/*  value={selectedNetwork}*/}
        {/*  onChange={setSelectedNetwork}*/}
        {/*  placeholder="Поиск сети..."*/}
        {/*/>*/}
      </section>

      <motion.section
        className={styles.learn}
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.2)}
      >
        <h2>Как это работает</h2>
        <ul>
          <li>Подключите ваш кошелёк</li>
          <li>Выберите активы для отслеживания</li>
          <li>Наслаждайтесь динамическими графиками</li>
        </ul>
      </motion.section>

      <motion.section
        className={styles.cta}
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.3)}
      >
        <h2>Готовы начать?</h2>
        <Button formatType="primary" formatSize="lg">
          Присоединиться к бета
        </Button>
      </motion.section>

      <footer className={styles.footer}>
        <span>© 2025 CraveX. Все права защищены.</span>
      </footer>
    </div>
  );
}
