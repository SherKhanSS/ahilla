import { FC } from 'react'
import Link from 'next/link'
import styles from './articles.module.scss'
import ArticleInner from '../ArticleInner/ArticleInner'
import Sort from '../Sort/Sort'
import { ArticleType } from '../../types'

type Props = {
  articles: ArticleType[]
}

const Articles: FC<Props> = ({ articles }) => {
  return (
    <section className={styles.main}>
      <section className={styles.articles}>
        <h2 className={styles.articles__titile}>Статьи</h2>
        <Sort />
        <ul className={styles.articles__list}>
          {articles.slice(0, 10).map((it: ArticleType, i: number) => {
            return (
              <li className={styles.articles__item} key={i}>
                <ArticleInner {...it} />
              </li>
            )
          })}
        </ul>
      </section>
      {/* <Pagination /> */}
    </section>
  )
}

export default Articles
