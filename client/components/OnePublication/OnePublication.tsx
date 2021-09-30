import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './one-publication.module.scss';
import { formatDate } from '../../utils';
import { ArticleType } from '../../types';
import { DangerousHtml } from '../DangerousHtml';
import Views from '../Icons/Views';

const OnePublication: FC<ArticleType> = ({
  name,
  author,
  image,
  date,
  content,
  views,
  description,
}) => {
  const editContent =
    description === '' ? content.replace(/\n/g, '</br>') : content;

  return (
    <article className={styles.main}>
      <div className={styles.info}>
        {formatDate(date)}
        <Link href="/">
          <a className={styles.link}>{author?.name}</a>
        </Link>
      </div>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.img_wrap}>
        <Image
          className={styles.image}
          src={image}
          alt={name}
          layout="responsive"
          width={700}
          height={400}
        />
        <div className={styles.views}>
          <Views />
          <span>Просмотры: {views}</span>
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.text}>
          {/*<div dangerouslySetInnerHTML={{ __html: content }} />*/}
          <DangerousHtml str={editContent} />
        </div>
      </div>
    </article>
  );
};

export default OnePublication;
