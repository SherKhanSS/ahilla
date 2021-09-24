import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Articles from '../components/Articles/Articles';
import { GetServerSideProps } from 'next';
import { ArticleType } from '../types';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const ArticlesPage: FC<{ articles: ArticleType[] }> = ({ articles }) => {
  return (
    <Layout>
      <Articles articles={articles} title={'Статьи'} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resArticles = await fetch(`${domainURL}/publications/articles/0/10`);
    const articles = await resArticles.json();

    return {
      props: {
        articles,
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
