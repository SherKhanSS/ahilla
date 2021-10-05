import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import { GetServerSideProps } from 'next';
import { ArticleType } from '../types';
import MobileHome from '../components/MobileHome/MobileHome';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Main: FC<{
  articles: ArticleType[];
  news: ArticleType[];
  publications: ArticleType[];
  isMobileOnServer: boolean;
}> = ({ articles, news, publications, isMobileOnServer }) => {
  return (
    <Layout>
      {isMobileOnServer ? (
        <MobileHome articles={publications} />
      ) : (
        <Home articles={articles} news={news} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UA = context.req.headers['user-agent'];
  const isMobileOnServer =
    UA !== undefined
      ? Boolean(
          UA.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
          )
        )
      : false;

  try {
    if (isMobileOnServer) {
      const resPublications = await fetch(
        `${domainURL}/api/publications/main-mobile`
      );
      const publications = await resPublications.json();

      return {
        props: {
          publications,
          isMobileOnServer,
        },
      };
    }

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
        isMobileOnServer,
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
