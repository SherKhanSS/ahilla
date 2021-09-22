import { FC } from 'react'
import Layout from '../components/Layout/Layout'
import Home from '../components/Home/Home'
import {GetServerSideProps} from "next";

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Main: FC<any> = ({articles, news}) => {
  return (
    <Layout>
      <Home articles={articles} news={news}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resArticles = await fetch(`${domainURL}/publications/articles/0/5`);
    const resNews = await fetch(`${domainURL}/publications/news/0/20`);
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
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default Main
