import { FC, ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideBar from '../SideBar/SideBar';
import styles from './layout.module.scss';
import Head from 'next/head';
import GoTop from '../GoTop/GoTop';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title key={'title'}>Ахилла</title>
        <meta
          key={'description'}
          name="description"
          content="Независимый аналитический проект «Ахилла»"
        />
        <meta key={'og-title'} property="og:title" content="Ахилла" />
        <meta
          key={'og-description'}
          property="og:description"
          content="Независимый аналитический проект «Ахилла»"
        />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <section className={styles.content}>{children}</section>
          <SideBar />
        </div>
      </main>
      <Footer />
      <GoTop />
    </>
  );
};

export default Layout;
