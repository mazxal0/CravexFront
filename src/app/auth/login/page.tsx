import LoginForm from './LoginForm';
import styles from './page.module.scss';

export const metadata = {
  title: 'Login | CraveX',
  description: 'The financial Web3 hub for your crypto and beyond.',
};

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
}
