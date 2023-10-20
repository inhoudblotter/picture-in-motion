import {useEffect, useRef, useState, useCallback} from 'react';
import {IGifObject} from 'src/shared/types';
import {Link} from 'react-router-dom';
import {GifActions} from 'src/shared/ui';
import {useIsOutOfView} from 'src/hooks/useIsOutOfView';
import styles from './Card.module.css';
import {useAppDispatch} from 'src/shared/model';
import {cleanGif} from 'src/shared/model/slices/gif';
interface ICard extends React.HTMLAttributes<HTMLAnchorElement> {
  item: IGifObject;
}

const BACKGROUND = [
  '#AAFF00',
  '#FFAA00',
  '#FF00AA',
  '#AA00FF',
  '#00AAFF',
  '#AAFF00',
  '#FFAA00',
  '#FF00AA',
];

export function Card({item, ...props}: ICard) {
  const link = `/gif/${item.id}`;
  const ref = useRef<HTMLAnchorElement>(null);
  const bg = useRef<string>(BACKGROUND[Math.round((BACKGROUND.length - 1) * Math.random())]);
  const [isOutOfView] = useIsOutOfView(ref);
  const [isLoaded, setLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const [size, setSize] = useState<string>(
    window.innerWidth <= 450 ? item.images.fixed_width_small.height : item.images.fixed_width.height
  );

  function preventAction(e: {_isAction?: boolean} & React.MouseEvent<HTMLAnchorElement>) {
    if (e._isAction) {
      e.preventDefault();
    } else {
      dispatch(cleanGif());
    }
  }

  useEffect(() => {
    if (isOutOfView && isLoaded) setLoaded(false);
  }, [isOutOfView, isLoaded]);

  const adaptive = useCallback(() => {
    if (window.innerWidth <= 450) {
      setSize(item.images.fixed_width_small.height);
    } else {
      setSize(item.images.fixed_width.height);
    }
  }, [item]);

  useEffect(() => {
    window.addEventListener('resize', adaptive);
    return () => window.removeEventListener('resize', adaptive);
  }, [adaptive]);
  return (
    <Link
      key={item.id}
      to={link}
      className={styles.item}
      onClick={preventAction}
      ref={ref}
      {...props}
    >
      <GifActions id={item.id} src={item.images.original.url} className={styles.actions} />
      <div
        className={styles.wrapper}
        style={{
          backgroundColor: bg.current,
          height: `${size}px`,
        }}
      >
        {!isOutOfView && (
          <img
            className={[styles.img, isLoaded ? styles.show : undefined].join(' ')}
            src={size === 'm' ? item.images.fixed_width.webp : item.images.fixed_width_small.webp}
            alt={item.alt_text}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    </Link>
  );
}
