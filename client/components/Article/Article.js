import Link from 'next/link'
import styles from './article.module.scss'
import { formatDate } from '../../utils/utils'

const Article = ({ name, author, image, date, content }) => {
  return (
    <article className={styles.main}>
      <Link href='/'>
        <a className={styles.image_link}>
          <img className={styles.image} src={image} />
        </a>
      </Link>
      <div className={styles.wrap}>
        <div className={styles.info}>
          {formatDate(date)}
          {author}
        </div>
        <h3 className={styles.title}>
          <Link href='/'>
            <a className={styles.title_link}>{name}</a>
          </Link>
        </h3>
        <div className={styles.text}>{content}</div>
        <Link href='/'>
          <a className={styles.link}>Подробнее</a>
        </Link>
      </div>
    </article>
  )
}

export default Article
