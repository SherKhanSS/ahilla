import { FC } from 'react'
import styles from './tags.module.scss'
import articles from '../../mocks/articles'
import Link from 'next/link'

const tags = Array.from(new Set(articles.map((it) => it.tags).flat()))

// const tags = [...new Set([].concat(...articles.map((it) => it.tags)))]

const Tags: FC = () => {
  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Поиск по меткам</h2>
      <ul className={styles.list}>
        {tags.map((it, i) => {
          return (
            <li className={styles.item} key={i}>
              <Link href='/'>
                <a className={styles.link}>{it}</a>
              </Link>
            </li>
          )
        })}
      </ul>
      <Link href='/'>
        <a className={styles.button}>Все метки</a>
      </Link>
    </section>
  )
}

export default Tags
