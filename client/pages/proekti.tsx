import {FC} from 'react';
import {GetServerSideProps} from 'next';
import Layout from '../components/Layout/Layout';
import {ArticleType} from '../types';
import OnePage from "../components/OnePage/OnePage";
import {getPropsPage} from "../utils";

const Projects: FC<{ article: ArticleType }> = ({ article }) => {
  return (
    <Layout>
      <OnePage {...article} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const slug = 'proekti';
  const name = 'Проекты';
  const description = 'На этой странице мы будем публиковать краткое описание тех проектов, которые мы надеемся развить с вашей помощью'

  return await getPropsPage(slug, name, description)
};

export default Projects;
