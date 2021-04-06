import articles from '../../mocks/articles'
import styles from './home.module.scss'
import Article from '../Article/Article'
import News from '../News/News'

const articlesSort = articles
  .filter((it) => it.category === 'thoughts')
  .slice(0, 5)
const newsSort = articles.filter((it) => it.category === 'news').slice(0, 5)

const Home = () => {
  return (
    <section className={styles.main}>
      <section className={styles.articles}>
        <h2>articles</h2>
        <ul className={styles.articles_list}>
          {articlesSort.map((it, i) => {
            return (
              <li className={styles.articles_item} key={i}>
                <Article {...it} />
              </li>
            )
          })}
        </ul>
      </section>
      <section className={styles.news}>
        <h2>news</h2>
        <ul className={styles.news_list}>
          {newsSort.map((it, i) => {
            return (
              <li className={styles.news_item} key={i}>
                <News {...it} />
              </li>
            )
          })}
        </ul>
      </section>
    </section>
  )
}

export default Home
