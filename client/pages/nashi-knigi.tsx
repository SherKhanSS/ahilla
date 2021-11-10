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
  const slug = 'nashi-knigi';
  const name = 'Наши книги';
  const description = 'На этой странице вы можете скачать наши книги, составленные по материалам «Ахиллы», а также другие интересные книги'

  return await getPropsPage(slug, name, description)
};

export default Projects;
