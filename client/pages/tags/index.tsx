import { FC } from 'react';
import Layout from '../../components/Layout/Layout';
import Authors from '../../components/Authors/Authors';
import { GetServerSideProps } from 'next';
import { TagType } from '../../types';
import Head from 'next/head';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Main: FC<{ tags: TagType[] }> = ({ tags }) => {
  const path = 'tags';
  const title = 'Метки';
  const description =
    'На этой странице вы можете найти все тексты по их меткам, просто нажав на нужную:';

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
        authors={tags}
        path={path}
        title={title}
        description={description}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resTags = await fetch(`${domainURL}/api/tags`);
    const tags = await resTags.json();

    return {
      props: {
        tags,
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
