import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Articles from '../components/Articles/Articles';
import { GetServerSideProps } from 'next';
import { ArticleType } from '../types';

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
      <Articles articles={news} path={path} title={title} count={count} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { order, sort, page } = query;

  if (
    order === undefined ||
    (+order !== 0 && +order !== 1) ||
    (sort !== 'updated_at' && sort !== 'views') ||
    page === undefined ||
    +page < 1
  ) {
    return {
      redirect: {
        destination: '/news?order=0&sort=updated_at&page=1',
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
          destination: '/news?order=0&sort=updated_at&page=1',
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
