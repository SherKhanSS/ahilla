import { FC, useEffect, useState } from 'react';
import styles from './tags.module.scss';
import Link from 'next/link';
import { useContextState } from '../../context/state';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const MOBILE_WIDTH = 660;
const INITIAL_COUNT = 10;
const DESKTOP_COUNT = 20;

const Tags: FC = () => {
  const { tags } = useContextState();
  const { width } = useWindowDimensions();
  const [count, setCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const isMobile = width === null ? true : width < MOBILE_WIDTH;
    const currentCount = isMobile ? INITIAL_COUNT : DESKTOP_COUNT;
    setCount(currentCount);
  }, [width]);

  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Поиск по тегам</h2>
      <ul className={styles.list}>
        {tags.slice(0, count).map((it, i) => {
          return (
            <li className={styles.item} key={i}>
              <Link href={`/tags/${it.id}?order=0&sort=date&page=1`}>
                <a className={styles.link}>{it.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <Link href="/tags">
        <a className={styles.button}>Все теги</a>
      </Link>
    </section>
  );
};

export default Tags;
