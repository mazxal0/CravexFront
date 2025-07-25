import { RegistrationForm } from '@/app/auth/registration/RegistrationForm';

export const metadata = {
  title: 'Registration | CraveX',
  description: 'The financial Web3 hub for your crypto and beyond.',
};

export default function Registration() {
  return (
    <div>
      <RegistrationForm />
    </div>
  );
}
