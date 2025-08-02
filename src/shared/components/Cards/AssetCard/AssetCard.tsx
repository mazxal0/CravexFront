'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { FC } from 'react';

import clsx from 'clsx';

import styles from './AssetCard.module.scss';

import { ChangingWithChevron } from '@/components/ui';
import { AssetCardProps } from '@/shared/components/Cards/AssetCard/AssetCard.Props';
import { useColorOfGrowing } from '@/shared/hooks';
import { formatNumberWithSpaces } from '@/shared/utils/formatNumberWithSpaces';

export const AssetCard: FC<AssetCardProps> = ({
  title,
  ticket,
  price,
  changing,
  amount,
  active,
  logoUrl,
  totalSum,
  className,
  ...props
}) => {
  const { color } = useColorOfGrowing(changing);

  const fallbackImage = '/fallback.png'; // должен лежать в папке public

  const isValidUrl = (url?: string | null): boolean => {
    if (!url || typeof url !== 'string') return false;
    return (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('/')
    );
  };

  const safeLogoUrl = isValidUrl(logoUrl) ? logoUrl! : fallbackImage;
  // console.log('SES', price);

  return (
    <motion.div
      aria-disabled={active}
      className={clsx(styles.container, active && styles.active, className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, maxHeight: 0 }}
      transition={{ duration: 0.3 }}
      layout
      {...props}
    >
      <div className={styles.left_column}>
        <div className={styles.image_box}>
          <Image
            className={styles.image}
            src={safeLogoUrl}
            alt={'Crypto image'}
            width={35}
            height={35}
          />
        </div>

        <div className={styles.title_ticket}>
          <p>{title}</p>
          <span className={styles.amount_ticket}>
            {amount} {ticket}
          </span>
        </div>
      </div>
      <div className={styles.right_column}>
        <span className={styles.number_all_cost}>
          ${formatNumberWithSpaces(Number(totalSum | 0), '\u200A')}
        </span>
        <ChangingWithChevron type={'mark'} color={color} changing={changing} />
      </div>
    </motion.div>
  );
};
