import LoginForm from './LoginForm';
import styles from './page.module.scss';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
}
