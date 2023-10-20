import {useLocation, Link} from 'react-router-dom';
import {EIcon, Icon} from 'src/shared/ui';
import styles from './Likes.module.css';

export function Likes() {
  const location = useLocation();
  const isLikes = location.pathname === '/likes';
  return (
    <Link
      to={isLikes ? '/' : '/likes'}
      className={[styles.link, isLikes ? styles.active : null].join(' ')}
    >
      <Icon name={EIcon.like} className={styles.icon} color="#666" />
    </Link>
  );
}
