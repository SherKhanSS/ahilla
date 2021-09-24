import { FC } from 'react';
import styles from './popular.module.scss';
import articles from '../../mocks/articles';
import Link from 'next/link';
import { useContextState } from '../../context/state';

const titles = articles.slice(0, 10);

const Popular: FC = () => {
  const { popularPublications } = useContextState();

  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Самое интересное:</h2>
      <ul className={styles.list}>
        {popularPublications.map((it, i) => {
          return (
            <li className={styles.item} key={i}>
              <Link href="/">
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
