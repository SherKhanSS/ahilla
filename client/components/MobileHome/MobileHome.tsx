import { FC } from 'react';
import styles from './mobile-home.module.scss';
import ArticleInner from '../ArticleInner/ArticleInner';
import { ArticleType } from '../../types';
import Link from 'next/link';

const MobileHome: FC<{
  articles: ArticleType[];
}> = ({ articles }) => {
  return (
    <section className={styles.main}>
      <section className={styles.articles}>
        <h2 className={styles.articles__titile}>Публикации</h2>
        <ul className={styles.articles__list}>
          {articles.map((it: ArticleType, i: number) => {
            return (
              <li className={styles.articles__item} key={i}>
                <ArticleInner {...it} />
              </li>
            );
          })}
        </ul>
        <div className={styles.links_wrap}>
          <Link href="/articles?order=0&sort=updated_at&page=1">
            <a className={styles.link}>Все статьи</a>
          </Link>
          <Link href="/news?order=0&sort=updated_at&page=1">
            <a className={styles.link}>Все новости</a>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default MobileHome;
