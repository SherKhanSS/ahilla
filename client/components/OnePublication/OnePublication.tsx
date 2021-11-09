import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './one-publication.module.scss';
import { formatDate } from '../../utils';
import { ArticleType } from '../../types';
// import { DangerousHtml } from '../DangerousHtml';
import Views from '../Icons/Views';
import Head from 'next/head';
import Tag from '../Icons/Tag';
import {
  FacebookShareButton,
  LivejournalShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  FacebookShareCount,
  VKShareCount,
} from 'react-share';
import { FBIcon, JJIcon, TGIcon, TVIcon, VKIcon } from '../Icons/SocialIcons';
import { domainURL, privateViewStates } from '../../constants';
import { useContextState } from '../../context/state';
import Edit from '../Icons/Edit';

const OnePublication: FC<ArticleType> = ({
  name,
  author,
  image,
  date,
  content,
  views,
  description,
  author_id,
  tags,
  slug,
  id,
}) => {
  const editContent = content.replace(/\n/g, '</br>');
  const { isAdmin } = useContextState();

  const handleEdit = (id: number) => {
    document.cookie = `view=${privateViewStates.editPublication}`;
    localStorage.setItem('currentEntityId', `${id}`);
    return window.location.assign('/administration/private');
  };

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
          {isAdmin && (
            <div
              className={styles.edit}
              title="Редактировать"
              onClick={() => {
                handleEdit(id);
              }}
            >
              <Edit />
            </div>
          )}
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
        <div className="text">
          <div className={'ck-content'}>
            <div dangerouslySetInnerHTML={{ __html: editContent }} />
          </div>
          {/*<DangerousHtml str={editContent} />*/}
        </div>
        <div className={styles.tags}>
          <Tag />
          {tags?.map((it, i, arr) => {
            return (
              <span key={i}>
                <Link href={`/tags/${it?.id}?order=0&sort=date&page=1`}>
                  <a className={styles.tags_link}>{it?.name}</a>
                </Link>
                <span>{arr.length - 1 !== i ? ', ' : ''}</span>
              </span>
            );
          })}
        </div>
        <div className={styles.socials_wrap}>
          <div className={styles.socials_title}>Поделиться:</div>
          <ul className={styles.socials}>
            <li className={styles.socials_items}>
              <FacebookShareButton url={`${domainURL}/${slug}`}>
                <FBIcon />
              </FacebookShareButton>
              {/*<div className={styles.socials_count}>*/}
              {/*  <FacebookShareCount url={`${domainURL}/${slug}`}>*/}
              {/*    {(count) => count}*/}
              {/*  </FacebookShareCount>*/}
              {/*</div>*/}
            </li>
            <li className={styles.socials_items}>
              <VKShareButton url={`${domainURL}/${slug}`}>
                <VKIcon />
              </VKShareButton>
              {/*<div className={styles.socials_count}>*/}
              {/*  <VKShareCount url={`${domainURL}/${slug}`}>*/}
              {/*    {(count) => count}*/}
              {/*  </VKShareCount>*/}
              {/*</div>*/}
            </li>
            <li className={styles.socials_items}>
              <TelegramShareButton url={`${domainURL}/${slug}`}>
                <TGIcon />
              </TelegramShareButton>
            </li>
            <li className={styles.socials_items}>
              <TwitterShareButton url={`${domainURL}/${slug}`}>
                <TVIcon />
              </TwitterShareButton>
            </li>
            <li className={styles.socials_items}>
              <LivejournalShareButton url={`${domainURL}/${slug}`}>
                <JJIcon />
              </LivejournalShareButton>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
};

export default OnePublication;
