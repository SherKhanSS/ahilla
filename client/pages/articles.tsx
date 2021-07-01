import { FC } from 'react'
import Layout from '../components/Layout/Layout'
import Articles from '../components/Articles/Articles'
import articles from '../mocks/articles'

const ArticlesPage: FC = () => {
  return (
    <Layout>
      <Articles articles={articles} />
    </Layout>
  )
}

export default ArticlesPage
