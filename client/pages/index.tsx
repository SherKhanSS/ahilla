import { FC } from 'react'
import Layout from '../components/Layout/Layout'
import Home from '../components/Home/Home'
import {GetServerSideProps} from "next";

const Main: FC<any> = ({publications}) => {
  return (
    <Layout>
      <Home publications={publications}/>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch(`http://localhost:5000/publications`);
    const publications = await response.json();

    return {
      props: {
        publications,
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
