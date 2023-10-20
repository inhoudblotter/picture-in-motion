import styles from './Loader.module.css';

interface ILoader extends React.HTMLAttributes<HTMLDivElement> {
  innerRef?: React.RefObject<HTMLDivElement>;
}

export function Loader({className, innerRef, ...props}: ILoader) {
  return <div className={[styles.loader, className].join(' ')} ref={innerRef} {...props}></div>;
}
