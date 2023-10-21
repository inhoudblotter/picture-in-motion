import styles from './Footer.module.css';
import logo from 'src/assets/image/logo.png';

export function Footer() {
  return (
    <footer className={styles.container}>
      <span className={styles.thanks}>
        Thanks to GIPHY for the <a href="https://developers.giphy.com/">API</a>
      </span>
      <img src={logo} alt="Челябинская марка" className={styles.logo} />
    </footer>
  );
}
