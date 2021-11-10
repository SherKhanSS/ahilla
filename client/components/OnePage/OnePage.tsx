import { FC } from 'react';
import styles from './one-page.module.scss';
import { ArticleType } from '../../types';
import Head from 'next/head';
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
import { domainURL } from '../../constants';

const OnePage: FC<ArticleType> = ({
  name,
  content,
  description,
  slug,
}) => {
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
        <meta key={'og-type'} property="og:type" content="article" />
      </Head>
      <article className={styles.main}>
        <div className="text">
          <div className={'ck-content'}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          {/*<DangerousHtml str={editContent} />*/}
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

export default OnePage;
