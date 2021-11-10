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
  const slug = 'o-nas';
  const name = 'О нас';
  const description = 'Имя нашему проекту дал замечательный персонаж Николая Лескова — дьякон Ахилла Десницын из «Соборян».'

  return await getPropsPage(slug, name, description)
};

export default Projects;
