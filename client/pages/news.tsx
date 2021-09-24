import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Articles from '../components/Articles/Articles';
import { GetServerSideProps } from 'next';
import { ArticleType } from '../types';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const ArticlesPage: FC<{ news: ArticleType[] }> = ({ news }) => {
  return (
    <Layout>
      <Articles articles={news} title={'Новости'} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resNews = await fetch(`${domainURL}/publications/news/0/10`);
    const news = await resNews.json();

    return {
      props: {
        news,
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
