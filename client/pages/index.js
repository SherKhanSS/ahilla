import Head from 'next/head'
import Header from '../components/Header/Header'
import Layout from '../components/Layout/Layout'
import Home from '../components/Home/Home'

const Main = () => {
  return (
    <>
      <Head>
        <title>Ахилла</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <Home />
      </Layout>
    </>
  )
}

export default Main