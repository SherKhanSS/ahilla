import { FC } from 'react';
import styles from './articles.module.scss';
import ArticleInner from '../ArticleInner/ArticleInner';
import Sort from '../Sort/Sort';
import { ArticleType } from '../../types';

const Articles: FC<{
  articles: ArticleType[];
  title: string;
  path: string;
  count: number;
  id?: string;
}> = ({ articles, path, title, count, id }) => {
  return (
    <section className={styles.main}>
      <section className={styles.articles}>
        <h2 className={styles.articles__titile}>{title}</h2>
        <Sort path={path} count={count} id={id}>
          <ul className={styles.articles__list}>
            {articles.map((it: ArticleType, i: number) => {
              return (
                <li className={styles.articles__item} key={i}>
                  <ArticleInner {...it} />
                </li>
              );
            })}
          </ul>
        </Sort>
      </section>
    </section>
  );
};

export default Articles;
