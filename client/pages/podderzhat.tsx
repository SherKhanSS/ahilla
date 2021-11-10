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
  const slug = 'podderzhat';
  const name = 'Поддержать';
  const description = 'Наш проект создается собственными силами, не имеет и не будет иметь спонсоров или попечителей, потому что это всегда — зависимость, необходимость учитывать мнение сильных и богатых.\n' +
    '\n' +
    'Мы надеемся на поддержку наших читателей. Только вместе с вами мы сможем регулярно оплачивать хостинг, техподдержку, работу редакции и, возможно, однажды — даже работу авторов.'

  return await getPropsPage(slug, name, description)
};

export default Projects;
