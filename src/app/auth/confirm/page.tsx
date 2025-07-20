'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Spinner } from '@/components/ui';
import { useMutationRequest } from '@/shared/hooks';

export default function Confirm() {
  const searchParams = useSearchParams();
  const emailToken = searchParams.get('email_token');

  const { replace } = useRouter();

  const { mutate } = useMutationRequest({
    defaultApiUrl: `${process.env.NEXT_PUBLIC_API_VERIFY_EMAIL}`,
    method: 'post',
    config: { params: { email_token: emailToken } },
  });

  useEffect(() => {
    if (emailToken) {
      mutate(
        {
          data: {},
        },
        {
          onSuccess: (data) => {
            replace(`../account/assets/${data.userId}`);
          },
          onError: (e) => {
            replace('../login');
          },
        },
      );
    }
  }, []);

  return <Spinner />;
}
