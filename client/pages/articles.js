import Layout from '../components/Layout/Layout'
import Articles from '../components/Articles/Articles'
import articles from '../mocks/articles'

const ArticlesPage = () => {
  return (
    <Layout>
      <Articles articles={articles} />
    </Layout>
  )
}

export default ArticlesPage
