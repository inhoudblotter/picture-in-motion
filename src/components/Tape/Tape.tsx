import {useEffect, useMemo, useRef, useState} from 'react';
import styles from './Tape.module.css';
import {Column} from './Column';
import {Loader} from 'src/shared/ui/Loader';
import {useAppDispatch, useAppSelector} from 'src/shared/model';
import {nextPage} from 'src/shared/model/slices/tape/actions';
import {Footer} from '..';
import {Alert} from '../Alert/Alert';

export function Tape() {
  const {items, loading, isEnd, pagination, type, error} = useAppSelector(state => state.tape);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(entries => {
        setIsBottom(entries.some(entry => entry.isIntersecting));
      }, {}),
    []
  );

  useEffect(() => {
    if (isBottom) {
      dispatch(nextPage({limit: 15}));
      setIsBottom(false);
    }
  }, [isBottom, loading, dispatch]);

  const [columns, setColumns] = useState(0);
  function adaptive() {
    const width = window.innerWidth;
    if (width > 1290) {
      setColumns(6);
    } else if (width > 1085) {
      setColumns(5);
    } else if (width > 875) {
      setColumns(4);
    } else if (width > 674) {
      setColumns(3);
    } else if (width > 450) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  }
  useEffect(() => {
    adaptive();
    window.addEventListener('resize', adaptive);
    return () => window.removeEventListener('resize', adaptive);
  }, []);
  return (
    <>
      <main className={styles.container} ref={ref}>
        <div className={styles.tape}>
          {[...Array(columns).keys()].map(i => (
            <Column key={i} items={items.filter((_, c) => c % columns === i)} observer={observer} />
          ))}
        </div>
        {loading && <Loader className={styles.loader} />}
        {isEnd && pagination.total_count > 0 && <span className={styles.end}>That's all!</span>}
        {isEnd && pagination.total_count === 0 && type !== 'likes' && (
          <span className={styles.end}>Try to find something else.</span>
        )}
        {isEnd && pagination.total_count === 0 && type === 'likes' && (
          <span className={styles.end}>Find something and like it.</span>
        )}
        {!!error && <Alert type="error" message={error.message} />}
      </main>
      {isEnd && (pagination.total_count > 0 || pagination.total_count === 0) && <Footer />}
    </>
  );
}
