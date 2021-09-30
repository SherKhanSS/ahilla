import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Articles from '../components/Articles/Articles';
import { GetServerSideProps } from 'next';
import { ArticleType } from '../types';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const LIMIT = 10;

const ArticlesPage: FC<{ articles: ArticleType[]; count: number }> = ({
  articles,
  count,
}) => {
  const path = 'articles';
  const title = 'Статьи';

  return (
    <Layout>
      <Articles articles={articles} path={path} title={title} count={count} />
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
        destination: '/articles?order=0&sort=updated_at&page=1',
        permanent: false,
      },
    };
  }

  const start = (+page - 1) * LIMIT;

  try {
    const resArticles = await fetch(
      `${domainURL}/publications/articles/${start}/${LIMIT}/${order}/${sort}`
    );
    const { articles, count } = await resArticles.json();

    if (count < start) {
      return {
        redirect: {
          destination: '/articles?order=0&sort=updated_at&page=1',
          permanent: false,
        },
      };
    }

    return {
      props: {
        articles,
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

export default ArticlesPage;
