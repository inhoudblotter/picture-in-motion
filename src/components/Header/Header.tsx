import styles from './Header.module.css';
import {Likes} from './Likes';
import {Search} from './Search';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Search />
        <Likes />
      </div>
    </header>
  );
}
