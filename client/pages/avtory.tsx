import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Authors from '../components/Authors/Authors';
import { GetServerSideProps } from 'next';
import { AuthorType } from '../types';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Main: FC<{ authors: AuthorType[] }> = ({ authors }) => {
  return (
    <Layout>
      <Authors authors={authors} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resAuthors = await fetch(`${domainURL}/authors`);
    const authors = await resAuthors.json();

    return {
      props: {
        authors,
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

export default Main;
