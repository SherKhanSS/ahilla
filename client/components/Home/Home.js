import Link from 'next/link'
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
        <h2 className={styles.articles__titile}>
          <Link href='/'>
            <a className={styles.articles__link}>Статьи</a>
          </Link>
        </h2>
        <ul className={styles.articles__list}>
          {articlesSort.map((it, i) => {
            return (
              <li className={styles.articles__item} key={i}>
                <Article {...it} />
              </li>
            )
          })}
        </ul>
      </section>
      <section className={styles.news}>
        <h2 className={styles.news__titile}>
          <Link href='/'>
            <a className={styles.news__link}>Новости</a>
          </Link>
        </h2>
        <ul className={styles.news__list}>
          {newsSort.map((it, i) => {
            return (
              <li className={styles.news__item} key={i}>
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
