import { FC } from 'react';
import Layout from '../../components/Layout/Layout';
import Authors from '../../components/Authors/Authors';
import { GetServerSideProps } from 'next';
import { TagType } from '../../types';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Main: FC<{ tags: TagType[] }> = ({ tags }) => {
  const path = 'tags';
  const title = 'Метки';
  const description =
    'На этой странице вы можете найти все тексты по их меткам, просто нажав на нужную:';

  return (
    <Layout>
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
    const resTags = await fetch(`${domainURL}/tags`);
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
