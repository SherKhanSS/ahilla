import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Development from '../components/Development/Development';
import Head from 'next/head';

const Main: FC = () => {
  return (
    <Layout>
      <Head>
        <title key={'title'}>Не найдено</title>
        <meta
          key={'description'}
          name="description"
          content={'Такой страницы не существует'}
        />
        <meta key={'og-title'} property="og:title" content={'Не найдено'} />
        <meta
          key={'og-description'}
          property="og:description"
          content={'Такой страницы не существует'}
        />
      </Head>
      <Development />
    </Layout>
  );
};

export default Main;
