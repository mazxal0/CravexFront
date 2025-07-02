import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export const OtherSpinner = () => {
  return <div className={styles.container_2} />;
};
