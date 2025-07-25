'use client';

import { GoogleIcon } from '@/components/icons';
import { ButtonOAuth } from '@/shared/components/common/OAuth/buttonOAuth';
export const OAuthGoogle = () => {
  const handleLogin = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: 'openid profile email',
    };

    const qs = new URLSearchParams(options).toString();
    window.location.href = `${rootUrl}?${qs}`;
  };

  return (
    <ButtonOAuth onClick={handleLogin}>
      <GoogleIcon width={30} height={30} />
    </ButtonOAuth>
  );
};
