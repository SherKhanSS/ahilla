import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './one-publication.module.scss';
import { formatDate } from '../../utils';
import { ArticleType } from '../../types';
import { DangerousHtml } from '../DangerousHtml';
import Views from '../Icons/Views';
import Head from 'next/head';

const OnePublication: FC<ArticleType> = ({
  name,
  author,
  image,
  date,
  content,
  views,
  description,
  author_id,
}) => {
  const editContent = content.replace(/\n/g, '</br>');

  return (
    <>
      <Head>
        <title key={'title'}>{name}</title>
        <meta key={'description'} name="description" content={description} />
        <meta key={'og-title'} property="og:title" content={name} />
        <meta
          key={'og-description'}
          property="og:description"
          content={description}
        />
        <meta key={'og-image'} property="og:image" content={image} />
        <meta key={'og-type'} property="og:type" content="article" />
      </Head>
      <article className={styles.main}>
        <div className={styles.info}>
          {formatDate(date)}
          <Link href={`/avtory/${author_id}?order=0&sort=date&page=1`}>
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
    </>
  );
};

export default OnePublication;
