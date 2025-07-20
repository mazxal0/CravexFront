import { Suspense } from 'react';

import VerificationInner from './VerificationInner';

import { Spinner } from '@/components/ui';

export const dynamic = 'force-dynamic';

export default function VerificationPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <VerificationInner />
    </Suspense>
  );
}
