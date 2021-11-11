import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../../components/Layout/Layout';
import OnePublication from '../../../components/OnePublication/OnePublication';
import { ArticleType } from '../../../types';
import * as cookie from "cookie";

const redirect = {
  redirect: {
    destination: '/administration/login',
    permanent: false,
  },
};

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Article: FC<{ article: ArticleType }> = ({ article }) => {
  return (
    <Layout>
      <OnePublication {...article} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const id = params?.id;
  const cookies = req.headers.cookie;
  const { token } =
    cookies === undefined ? { token: '' } : cookie.parse(cookies);

  try {
    const response = await fetch(`${domainURL}/api/publications/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const article = await response.json();
      return {
        props: { article },
      };
    }
  } catch (err) {
    return redirect;
  }
  return redirect;
};

export default Article;
