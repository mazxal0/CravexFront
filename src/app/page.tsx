'use client';

import Link from 'next/link';

import { Button } from '@/components/ui';

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Link href={'/auth/registration'}>
        <Button>Начать</Button>
      </Link>
    </div>
  );
}
