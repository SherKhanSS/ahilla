import { FC, useEffect, useState } from 'react';
import styles from './popular.module.scss';
import Link from 'next/link';
import { useContextState } from '../../context/state';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const MOBILE_WIDTH = 660;
const INITIAL_COUNT = 3;
const DESKTOP_COUNT = 10;

const Popular: FC = () => {
  const { popularPublications } = useContextState();
  const { width } = useWindowDimensions();
  const [count, setCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    const isMobile = width === null ? true : width < MOBILE_WIDTH;
    const currentCount = isMobile ? INITIAL_COUNT : DESKTOP_COUNT;
    setCount(currentCount);
  }, [width]);

  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Самое интересное:</h2>
      <ul className={styles.list}>
        {popularPublications.slice(0, count).map((it, i) => {
          return (
            <li className={styles.item} key={i}>
              <Link href={`/${it.slug}`}>
                <a className={styles.link}>{it.name}</a>
              </Link>
              <br />
              <span className={styles.views}>- Просмотров: {it.views}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Popular;
