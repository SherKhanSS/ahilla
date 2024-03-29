import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './article.module.scss';
import { formatDate } from '../../utils';
import { ArticleType } from '../../types';
import { DangerousHtml } from '../DangerousHtml';

const Article: FC<ArticleType> = ({
  name,
  author,
  image,
  date,
  slug,
  description,
}) => {
  return (
    <article className={styles.main}>
      <Link href={`/${slug}`}>
        <a className={styles.image_link}>
          <Image
            className={styles.image}
            src={image}
            alt={name}
            layout="responsive"
            width={700}
            height={400}
          />
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

export default Article;
