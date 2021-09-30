import { FC } from 'react';
import Link from 'next/link';
import styles from './news.module.scss';
import { formatDate } from '../../utils';
import { ArticleType } from '../../types';

const News: FC<ArticleType> = ({ name, author, date, slug }) => {
  return (
    <article className={styles.main}>
      <div className={styles.info}>
        {formatDate(date)}
        {author?.name}
      </div>
      <h3 className={styles.title}>
        <Link href={`/${slug}`}>
          <a className={styles.title_link}>{name}</a>
        </Link>
      </h3>
    </article>
  );
};

export default News;
