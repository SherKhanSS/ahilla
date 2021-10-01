import {FC} from 'react';
import {GetServerSideProps} from 'next';
import Layout from '../components/Layout/Layout';
import OnePublication from '../components/OnePublication/OnePublication';
import {ArticleType} from '../types';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Article: FC<{ article: ArticleType }> = ({article}) => {
  return (
    <Layout>
      <OnePublication {...article} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const slug = params?.slug;

  try {
    const response = await fetch(`${domainURL}/publications/${slug}`);

    if (response.status === 500) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    const article = await response.json();

    return {
      props: {
        article,
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

export default Article;
