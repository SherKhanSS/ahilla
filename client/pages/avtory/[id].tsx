import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout/Layout';
import OnePublication from '../../components/OnePublication/OnePublication';
import { ArticleType } from '../../types';
import Articles from '../../components/Articles/Articles';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;
const LIMIT = 10;

const Article: FC<{ articles: ArticleType[]; count: number; id: string }> = ({
  articles,
  count,
  id,
}) => {
  const path = 'avtory';
  const title = articles[0].author.name;

  return (
    <Layout>
      <Articles
        articles={articles}
        path={path}
        title={title}
        count={count}
        id={id}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
}) => {
  const { order, sort, page } = query;
  const id = params?.id;

  if (id === 'null') {
    return {
      redirect: {
        destination: `/404`,
        permanent: false,
      },
    };
  }

  if (
    order === undefined ||
    (+order !== 0 && +order !== 1) ||
    (sort !== 'updated_at' && sort !== 'views') ||
    page === undefined ||
    +page < 1
  ) {
    return {
      redirect: {
        destination: `/avtory/${id}?order=0&sort=updated_at&page=1`,
        permanent: false,
      },
    };
  }

  const start = (+page - 1) * LIMIT;

  console.log(start);

  try {
    const resArticles = await fetch(
      `${domainURL}/publications/authors/${id}/${start}/${LIMIT}/${order}/${sort}`
    );
    const { articles, count } = await resArticles.json();

    if (count < start) {
      return {
        redirect: {
          destination: `/avtory/${id}?order=0&sort=updated_at&page=1`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        articles,
        count,
        id,
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

export default Article;
