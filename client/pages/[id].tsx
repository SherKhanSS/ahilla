import { FC } from 'react';
import { GetServerSideProps } from 'next';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Article: FC<any> = ({ article }) => {
  console.log(article)
  return (
    <div>
      {article.name}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  console.log(id)

  try {
    const response = await fetch(`${domainURL}/publications/${id}`);
    const article = await response.json();

    return {
      props: {
        article,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default Article;