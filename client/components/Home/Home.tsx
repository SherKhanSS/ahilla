import { FC } from 'react';
import Link from 'next/link';
import styles from './home.module.scss';
import Article from '../Article/Article';
import News from '../News/News';
import ArrowMore from '../Icons/ArrowMore';
import { ArticleType } from '../../types';

const Home: FC<{ articles: ArticleType[]; news: ArticleType[] }> = ({
  articles,
  news,
}) => {
  return (
    <section className={styles.main}>
      <section className={styles.articles}>
        <h2 className={styles.articles__titile}>
          <Link href="/articles?order=0&sort=date&page=1">
            <a className={styles.articles__link}>Статьи</a>
          </Link>
        </h2>
        <ul className={styles.articles__list}>
          {articles.map((it: ArticleType, i: number) => {
            return (
              <li className={styles.articles__item} key={i}>
                <Article {...it} />
              </li>
            );
          })}
        </ul>
        <Link href="/articles?order=0&sort=date&page=1">
          <a className={styles.more}>
            <span>Все статьи</span>
            <ArrowMore />
          </a>
        </Link>
      </section>
      <section className={styles.news}>
        <h2 className={styles.news__titile}>
          <Link href="/news?order=0&sort=date&page=1">
            <a className={styles.news__link}>Новости</a>
          </Link>
        </h2>
        <div className={styles.news__wrap}>
          <ul className={styles.news__list}>
            {news.map((it: ArticleType, i: number) => {
              return (
                <li className={styles.news__item} key={i}>
                  <News {...it} />
                </li>
              );
            })}
          </ul>
          <Link href="/news?order=0&sort=date&page=1">
            <a className={styles.more}>
              <span>Все новости</span>
              <ArrowMore />
            </a>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Home;
