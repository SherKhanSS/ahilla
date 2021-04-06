import Link from 'next/link'
import styles from './news.module.scss'
import { formatDate } from '../../utils/utils'

const News = ({ name, author, date }) => {
  return (
    <article className={styles.main}>
      <div className={styles.info}>
        {formatDate(date)}
        {author}
      </div>
      <h3 className={styles.title}>
        <Link href='/'>
          <a className={styles.title_link}>{name}</a>
        </Link>
      </h3>
    </article>
  )
}

export default News
