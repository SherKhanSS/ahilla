import { FC } from 'react';
import Layout from '../../components/Layout/Layout';
import Authors from '../../components/Authors/Authors';
import { GetServerSideProps } from 'next';
import { AuthorType } from '../../types';
import Head from 'next/head';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Main: FC<{ authors: AuthorType[] }> = ({ authors }) => {
  const path = 'avtory';
  const title = 'Авторы';
  const description =
    'На этой странице вы можете найти все тексты наших авторов, просто нажав на имя/фамилию нужного автора:';

  return (
    <Layout>
      <Head>
        <title key={'title'}>{title}</title>
        <meta key={'description'} name="description" content={description} />
        <meta key={'og-title'} property="og:title" content={title} />
        <meta
          key={'og-description'}
          property="og:description"
          content={description}
        />
      </Head>
      <Authors
        authors={authors}
        path={path}
        title={title}
        description={description}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resAuthors = await fetch(`${domainURL}/api/authors`);
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
