import {HTMLAttributes, useEffect, useRef} from 'react';
import {IGifObject} from 'src/shared/types';
import styles from './Column.module.css';
import {Card} from './Card';
import {useAppSelector} from 'src/shared/model';
import {useLocation} from 'react-router-dom';

interface IColumn extends HTMLAttributes<HTMLDivElement> {
  items: IGifObject[];
  observer: IntersectionObserver;
}

export function Column({items, observer, ...props}: IColumn) {
  const endRef = useRef<HTMLDivElement>(null);
  const loading = useAppSelector(state => state.tape.loading);
  useEffect(() => {
    const endBlock = endRef.current;
    if (endBlock) observer.observe(endBlock);
    return () => {
      if (endBlock) observer.unobserve(endBlock);
    };
  }, [observer, endRef, items]);
  return (
    <div className={styles.container} {...props}>
      {items.map((item, i) => (
        <Card key={i} item={item} />
      ))}
      {!loading && <div ref={endRef}></div>}
    </div>
  );
}
