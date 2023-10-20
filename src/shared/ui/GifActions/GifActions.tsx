import {useAppDispatch, useAppSelector} from 'src/shared/model';
import {addLike, removeLike} from 'src/shared/model/slices/likes';
import styles from './GifActions.module.css';
import {EIcon, Icon} from '..';

interface IGifActions extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  src: string;
}

export function GifActions({id, src, className, ...props}: IGifActions) {
  const isLiked = useAppSelector(state => state.likes.items.findIndex(el => el === id) !== -1);
  const dispatch = useAppDispatch();
  async function handleDownload(e: {_isAction: boolean} & React.MouseEvent<HTMLButtonElement>) {
    e._isAction = true;
    fetch(src)
      .then(res => {
        return res.blob();
      })
      .then(data => {
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = id + '.gif';
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  }
  function handleLike(e: {_isAction: boolean} & React.MouseEvent<HTMLButtonElement>) {
    e._isAction = true;
    if (!isLiked) {
      dispatch(addLike(id));
    } else dispatch(removeLike(id));
  }
  return (
    <div className={[styles.container, className].join(' ')} {...props}>
      <button
        className={[styles.action, styles.save].join(' ')}
        aria-label="save"
        onClick={handleDownload}
      >
        <Icon name={EIcon.save} />
      </button>
      <button
        className={[styles.action, styles.like, isLiked ? styles.liked : undefined].join(' ')}
        onClick={handleLike}
      >
        <Icon name={EIcon.like} />
      </button>
    </div>
  );
}
