'use client';

import { Suspense } from 'react';

import ConfirmInner from '@/app/auth/confirm/ConfirmInner';
import { Spinner } from '@/components/ui';

export default function Confirm() {
  return (
    <Suspense fallback={<Spinner />}>
      <ConfirmInner />
    </Suspense>
  );
}
