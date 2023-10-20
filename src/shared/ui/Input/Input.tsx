import styles from './Input.module.css';

export function Input({className, ...props}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={[styles.el, className].join(' ')} {...props}></input>;
}
