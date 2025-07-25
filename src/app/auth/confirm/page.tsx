import { Suspense } from 'react';

import ConfirmInner from '@/app/auth/confirm/ConfirmInner';
import { Spinner } from '@/components/ui';

export const metadata = {
  title: 'Verification | CraveX',
  description: 'The financial Web3 hub for your crypto and beyond.',
};

export default function Confirm() {
  return (
    <Suspense fallback={<Spinner />}>
      <ConfirmInner />
    </Suspense>
  );
}
