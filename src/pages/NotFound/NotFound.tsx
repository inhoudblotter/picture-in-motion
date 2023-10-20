import {useNavigate} from 'react-router-dom';
import {BaseLayout} from '../layouts';
import styles from './NotFound.module.css';

export function NotFound() {
  const navigate = useNavigate();
  return (
    <BaseLayout>
      <div className={styles.container}>
        <span className={styles.code}>404</span>
        <h1 className={styles.descr}>Page not found</h1>
        <button className={styles.btn} onClick={() => navigate('/')}>
          go to main page 🢡
        </button>
      </div>
    </BaseLayout>
  );
}
