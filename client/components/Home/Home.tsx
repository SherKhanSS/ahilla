import { FC } from 'react'
import Link from 'next/link'
import articles from '../../mocks/articles'
import styles from './home.module.scss'
import Article from '../Article/Article'
import News from '../News/News'
import ArrowMore from '../Icons/ArrowMore'

const articlesSort = articles
  .filter((it) => it.category === 'thoughts')
  .slice(0, 5)
const newsSort = articles.filter((it) => it.category === 'news').slice(0, 5)

const Home: FC = () => {
  return (
    <section className={styles.main}>
      <section className={styles.articles}>
        <h2 className={styles.articles__titile}>
          <Link href='/articles'>
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
        <Link href='/articles'>
          <a className={styles.more}>
            <span>Все статьи</span>
            <ArrowMore />
          </a>
        </Link>
      </section>
      <section className={styles.news}>
        <h2 className={styles.news__titile}>
          <Link href='/news'>
            <a className={styles.news__link}>Новости</a>
          </Link>
        </h2>
        <div className={styles.news__wrap}>
          <ul className={styles.news__list}>
            {newsSort.map((it, i) => {
              return (
                <li className={styles.news__item} key={i}>
                  <News {...it} />
                </li>
              )
            })}
          </ul>
          <Link href='/news'>
            <a className={styles.more}>
              <span>Все новости</span>
              <ArrowMore />
            </a>
          </Link>
        </div>
      </section>
    </section>
  )
}

export default Home
