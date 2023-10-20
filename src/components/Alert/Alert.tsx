import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';
import {EIcon, Icon} from 'src/shared/ui';
import styles from './Alert.module.css';

interface IAlert extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  type: 'error';
  lifeTime?: number;
}

export function Alert({message, type, lifeTime = 5000, ...props}: IAlert) {
  const root = document.querySelector('#alert-root');
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  function close() {
    const el = ref.current;
    if (el) {
      el.classList.remove(styles.show);
      el.addEventListener(
        'transitionend',
        () => {
          el.remove();
        },
        {once: true}
      );
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add(styles.show);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(close, lifeTime);
    }
  }, [ref, lifeTime]);

  if (!root) return null;
  return createPortal(
    <div className={[styles.container, styles[type]].join(' ')} ref={ref} {...props}>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={close}>
        <Icon name={EIcon.close} />
      </button>
    </div>,
    root
  );
}
