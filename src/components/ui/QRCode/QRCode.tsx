'use client';
import QRCodeStyling from 'qr-code-styling';
import { useEffect, useRef } from 'react';

import styles from './QRCode.module.scss';

import { QRCodeProps } from '@/components/ui/QRCode/QRCode.props';

export const QRCode = ({ apiWebsite, size }: QRCodeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!ref.current || qrCodeRef.current) return; // Предотвращаем повторное создание

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      data: apiWebsite,
      image: '/craveX.svg',
      dotsOptions: {
        color: '#000',
        type: 'square',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5,
      },
    });

    qrCodeRef.current = qrCode;
    qrCode.append(ref.current);

    // Функция очистки
    return () => {
      if (ref.current) {
        ref.current.innerHTML = ''; // Очищаем содержимое при размонтировании
      }
    };
  }, []);

  return <div className={styles.qr_code} ref={ref} />;
};
