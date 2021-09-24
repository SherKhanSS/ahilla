import { FC } from 'react';
import styles from './articles.module.scss';
import ArticleInner from '../ArticleInner/ArticleInner';
import Sort from '../Sort/Sort';
import { ArticleType } from '../../types';

const Articles: FC<{ articles: ArticleType[]; title: string }> = ({
  articles,
  title,
}) => {
  return (
    <section className={styles.main}>
      <section className={styles.articles}>
        <h2 className={styles.articles__titile}>{title}</h2>
        <Sort />
        <ul className={styles.articles__list}>
          {articles.slice(0, 10).map((it: ArticleType, i: number) => {
            return (
              <li className={styles.articles__item} key={i}>
                <ArticleInner {...it} />
              </li>
            );
          })}
        </ul>
      </section>
      {/* <Pagination /> */}
    </section>
  );
};

export default Articles;
