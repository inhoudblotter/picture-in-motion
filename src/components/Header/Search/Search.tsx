import {useState, useRef} from 'react';
import {EIcon, Icon, Input} from 'src/shared/ui';
import {Suggest} from './Suggest';
import styles from './Search.module.css';
import {getAutocomplete} from 'src/shared/api';
import {useNavigate} from 'react-router-dom';

export function Search() {
  const [value, setValue] = useState('');
  const [suggestItems, setSuggestItems] = useState([]);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const nav = useNavigate();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    if (v.length < 50) {
      setValue(v);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(async () => {
        setSuggestItems(await getAutocomplete(v));
        timeout.current = null;
      }, 1000);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    nav(`/?query=${value}`);
    if (timeout.current) clearTimeout(timeout.current);
    setSuggestItems([]);
  }

  function handleClickSuggest(value: string) {
    setSuggestItems([]);
    setValue(value);
  }

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Input className={styles.input} value={value} onChange={onChange} type="search" />
      <button className={styles.btn} type="submit" aria-label="Поиск">
        <Icon name={EIcon.search} className={styles.icon} />
      </button>
      {!!suggestItems.length && <Suggest items={suggestItems} onClose={handleClickSuggest} />}
    </form>
  );
}
