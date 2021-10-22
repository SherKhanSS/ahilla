import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Articles from '../components/Articles/Articles';
import { GetServerSideProps } from 'next';
import { ArticleType } from '../types';
import Head from 'next/head';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const LIMIT = 10;

const NewsPage: FC<{ news: ArticleType[]; count: number }> = ({
  news,
  count,
}) => {
  const path = 'news';
  const title = 'Новости';

  return (
    <Layout>
      <Head>
        <title key={'title'}>Новости</title>
        <meta
          key={'description'}
          name="description"
          content={'Раздел новостей'}
        />
        <meta key={'og-title'} property="og:title" content={'Новости'} />
        <meta
          key={'og-description'}
          property="og:description"
          content={'Раздел новостей'}
        />
      </Head>
      <Articles articles={news} path={path} title={title} count={count} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { order, sort, page } = query;

  if (
    order === undefined ||
    (+order !== 0 && +order !== 1) ||
    (sort !== 'date' && sort !== 'views') ||
    page === undefined ||
    +page < 1
  ) {
    return {
      redirect: {
        destination: '/news?order=0&sort=date&page=1',
        permanent: false,
      },
    };
  }

  const start = (+page - 1) * LIMIT;

  try {
    const resNews = await fetch(
      `${domainURL}/api/publications/news/${start}/${LIMIT}/${order}/${sort}`
    );
    const { news, count } = await resNews.json();

    if (count < start) {
      return {
        redirect: {
          destination: '/news?order=0&sort=date&page=1',
          permanent: false,
        },
      };
    }

    return {
      props: {
        news,
        count,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default NewsPage;
