import { FC } from 'react';
import styles from './tags.module.scss';
import Link from 'next/link';
import { useContextState } from '../../context/state';

const Tags: FC = () => {
  const { tags } = useContextState();

  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Поиск по меткам</h2>
      <ul className={styles.list}>
        {tags.map((it, i) => {
          return (
            <li className={styles.item} key={i}>
              <Link href={`/tags/${it.id}`}>
                <a className={styles.link}>{it.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/tags">
        <a className={styles.button}>Все метки</a>
      </Link>
    </section>
  );
};

export default Tags;
