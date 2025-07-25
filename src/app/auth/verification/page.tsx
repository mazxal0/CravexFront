import { Suspense } from 'react';

import VerificationInner from './VerificationInner';

import { Spinner } from '@/components/ui';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Verification | CraveX',
  description: 'The financial Web3 hub for your crypto and beyond.',
};

export default function VerificationPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <VerificationInner />
    </Suspense>
  );
}
