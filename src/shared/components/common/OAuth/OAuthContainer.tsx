import styles from './OAuthContainer.module.scss';

import { OAuthGoogle, OAuthTelegram } from '@/shared/components';

export const OAuthContainer = () => {
  return (
    <div className={styles.Oauth_container}>
      <div className={styles.divider}>
        <hr className={styles.line} />
        <span className={styles.oauth_text}>Войти через</span>
        <hr className={styles.line} />
      </div>
      <div className={styles.links_oauth}>
        <OAuthTelegram />
        <OAuthGoogle />
      </div>
    </div>
  );
};
