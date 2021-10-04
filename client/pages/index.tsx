import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import { GetServerSideProps } from 'next';
import { ArticleType } from '../types';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Main: FC<{ articles: ArticleType[]; news: ArticleType[] }> = ({
  articles,
  news,
}) => {
  return (
    <Layout>
      <Home articles={articles} news={news} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resArticles = await fetch(
      `${domainURL}/api/publications/main-articles`
    );
    const resNews = await fetch(`${domainURL}/api/publications/main-news`);
    const articles = await resArticles.json();
    const news = await resNews.json();

    return {
      props: {
        articles,
        news,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Main;
