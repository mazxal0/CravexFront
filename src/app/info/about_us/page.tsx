'use client';

import { motion, Variants, TargetAndTransition } from 'framer-motion';

import styles from './About.module.scss';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number = 1): TargetAndTransition => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.3,
      ease: 'easeOut' as const,
    },
  }),
};

const cardContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut' as const,
    },
  },
};

export default function AboutPage() {
  const whyItems = [
    {
      icon: '🔒',
      title: 'User-First Decentralization',
      text: 'We understand the needs of Web3 users and honor the core traditions of decentralization.',
    },
    {
      icon: '⚡',
      title: 'Real-time Alerts',
      text: 'Price notifications straight to your Telegram.',
    },
    {
      icon: '📊',
      title: 'Analytics',
      text: 'Charts and reports on all your assets.',
    },
  ];

  const timelineSteps = [
    'Create wallet',
    'Add coins',
    'Track prices',
    'Get notifications',
  ];

  return (
    <>
      <motion.section
        className={styles.hero}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        custom={1}
      >
        <motion.h1
          className={styles.heading}
          variants={sectionVariants}
          custom={2}
        >
          About CraveX
        </motion.h1>
        <motion.p
          className={styles.subheading}
          variants={sectionVariants}
          custom={3}
        >
          Your all-in-one crypto portfolio manager
        </motion.p>
      </motion.section>

      <div className={styles.container}>
        <motion.section
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          custom={4}
        >
          <h2 className={styles.section_title}>Our Story</h2>
          <p className={styles.paragraph}>
            The story of CraveX began in the autumn of 2024, when a group of
            crypto enthusiasts realized that decentralization—while bringing
            many benefits— also introduced new inconveniences. With DeFi and
            traditional assets more divided than ever, people found themselves
            juggling over a dozen different apps (wallets, trackers, etc.),
            creating a fragmented and frustrating experience. Our vision is to
            build a cohesive Web3 ecosystem that, even if it doesn’t
            revolutionize everything, will at least offer a fresh, unified
            experience for Web3 users. We aim to create something truly
            worthwhile.
          </p>
        </motion.section>

        <motion.section
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardContainer}
        >
          <h2 className={styles.section_title}>Why Choose Us</h2>
          <div className={styles.cards}>
            {whyItems.map((item, idx) => (
              <motion.div
                key={idx}
                className={styles.card}
                variants={cardVariants}
              >
                <div className={styles['card-icon']}>{item.icon}</div>
                <h3 className={styles.card_title}>{item.title}</h3>
                <p className={styles.card_text}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          custom={7}
        >
          <h2 className={styles.section_title}>How It Works</h2>
          <div className={styles.timeline}>
            {timelineSteps.map((step, i) => (
              <motion.div
                key={i}
                className={styles.timelineStep}
                variants={cardVariants}
              >
                <div className={styles.stepNumber}>{i + 1}</div>
                <p className={styles.stepText}>{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className={styles.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          custom={8}
        >
          <h2 className={styles.section_title}>Contact Us</h2>
          <p className={styles.paragraph}>
            Have questions or feedback? Email us at{' '}
            <a href="mailto:cravexbank@gmail.com" className={styles.link}>
              cravexbank@gmail.com
            </a>
          </p>
        </motion.section>
      </div>
    </>
  );
}
