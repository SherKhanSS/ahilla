import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Search from '../components/Search/Search';
import Head from 'next/head';

const SearchPage: FC = () => {
  return (
    <Layout>
      <Head>
        <title key={'title'}>Поиск</title>
        <meta
          key={'description'}
          name="description"
          content={'Здесь вы можете найти интересующие вас материалы'}
        />
        <meta key={'og-title'} property="og:title" content={'Поиск'} />
        <meta
          key={'og-description'}
          property="og:description"
          content={'Здесь вы можете найти интересующие вас материалы'}
        />
      </Head>
      <Search />
    </Layout>
  );
};

export default SearchPage;
