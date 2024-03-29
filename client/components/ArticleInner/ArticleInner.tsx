import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './article-inner.module.scss';
import { ArticleType } from '../../types';
import { formatDate } from '../../utils';

const ArticleInner: FC<ArticleType> = ({
  name,
  author,
  image,
  date,
  description,
  slug,
}) => {
  return (
    <article className={styles.main}>
      <Link href={`/${slug}`}>
        <a className={styles.image_link}>
          {image && (
            <Image
              className={styles.image}
              src={image}
              alt={name}
              layout="responsive"
              width={700}
              height={400}
            />
          )}
        </a>
      </Link>
      <div className={styles.wrap}>
        <div className={styles.info}>
          {formatDate(date)}
          {author?.name}
        </div>
        <h3 className={styles.title}>
          <Link href={`/${slug}`}>
            <a className={styles.title_link}>{name}</a>
          </Link>
        </h3>
        <div className={styles.text}>{description}</div>
        <Link href={`/${slug}`}>
          <a className={styles.link}>Подробнее</a>
        </Link>
      </div>
    </article>
  );
};

export default ArticleInner;
