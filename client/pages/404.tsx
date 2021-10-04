import { FC } from 'react';
import Layout from '../components/Layout/Layout';
import Development from '../components/Development/Development';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Main: FC = () => {
  return (
    <Layout>
      <Development />
    </Layout>
  );
};

export default Main;
