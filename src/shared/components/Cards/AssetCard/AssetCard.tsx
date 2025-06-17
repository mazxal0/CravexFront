'use client';

import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import clsx from 'clsx';

import styles from './AssetCard.module.scss';

import { ChangingWithChevron } from '@/components/ui';
import { AssetCardProps } from '@/shared/components/Cards/AssetCard/AssetCard.Props';
import { formatNumberWithSpaces } from '@/shared/utils/formatNumberWithSpaces';

export const AssetCard: FC<AssetCardProps> = ({
  title,
  ticket,
  price,
  changing,
  amount,
  logoUrl,
  className,
  ...props
}) => {
  const [colorOfGrowing, setColorOfGrowing] = useState<
    'var(--success-color)' | 'var(--error-color)'
  >('var(--success-color)');

  useEffect(() => {
    if (changing < 0) {
      setColorOfGrowing('var(--error-color)');
    }
  }, [changing]);

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

  return (
    <div className={clsx(styles.container, className)} {...props}>
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
          ${formatNumberWithSpaces(price * amount, '\u200A')}
        </span>
        <ChangingWithChevron
          type={'mark'}
          color={colorOfGrowing}
          changing={changing}
        />
      </div>
    </div>
  );
};
