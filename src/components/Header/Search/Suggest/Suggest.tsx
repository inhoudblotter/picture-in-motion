import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import styles from './Suggest.module.css';

interface ISuggest extends React.HTMLAttributes<HTMLUListElement> {
  items: string[];
  onClose: (value: string) => void;
}

export function Suggest({items, onClose, ...props}: ISuggest) {
  const ref = useRef<HTMLUListElement>(null);
  const handleClose = (value: string) => () => {
    if (ref.current) {
      ref.current.classList.remove(styles.open);
      ref.current.addEventListener('transitionend', () => onClose(value), {once: true});
    }
  };

  useEffect(() => {
    if (ref.current) ref.current.classList.add(styles.open);
  }, [ref]);

  return (
    <ul className={styles.container} ref={ref} {...props}>
      {items.map(item => (
        <li key={item} className={styles.item}>
          <Link className={styles.link} to={`/?query=${item}`} onClick={handleClose(item)}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
}
