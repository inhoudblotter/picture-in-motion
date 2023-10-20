import styles from './Skeleton.module.css';

export function Skeleton() {
  return (
    <main className={styles.container}>
      <div className={styles.gif}></div>
      <div className={styles.title}></div>
      <div className={styles.date}></div>
      <div className={styles.user}>
        <div className={styles.username}></div>
        <div className={styles.avatar}></div>
      </div>
    </main>
  );
}
