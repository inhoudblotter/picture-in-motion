import {useAppSelector} from 'src/shared/model';
import {Skeleton} from './Skeleton';
import styles from './GifCard.module.css';
import {GifActions} from 'src/shared/ui';
import {Navigate} from 'react-router-dom';
import {Alert} from '../Alert/Alert';

export function GifCard() {
  const {item, error} = useAppSelector(state => state.gif);
  if (error?.code === 404) return <Navigate to="/not-found" />;
  return (
    <>
      {!item ? (
        <Skeleton />
      ) : (
        <main className={styles.container}>
          <div
            className={styles.imgContainer}
            style={{
              height: `${
                (300 / Number(item.images.original.width)) * Number(item.images.original.height)
              }px`,
            }}
          >
            <GifActions id={item.id} src={item.images.original.url} />
            <picture>
              <source srcSet={item.images.original.webp} type="image/webp" />
              <img
                className={styles.img}
                src={item.images.original.url}
                alt={item.alt_text}
                loading="lazy"
              />
            </picture>
          </div>
          <h1 className={styles.title}>{item.title}</h1>
          <span className={styles.date}>
            {new Date(item.import_datetime).toLocaleString('ru-RU')}
          </span>
          <div className={styles.user}>
            {!item.user ? (
              <a href={item.source} className={styles.username} target="_blank">
                {item.source_tld}
              </a>
            ) : (
              <>
                <p className={styles.username} id="username">
                  {item.user.display_name}
                </p>
                <img
                  className={styles.avatar}
                  src={item.user.avatar_url}
                  aria-describedby="username"
                ></img>
              </>
            )}
          </div>
        </main>
      )}
      {!!error && <Alert type="error" message={error.message} />}
    </>
  );
}
