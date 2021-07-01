import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './article.module.scss'
import { formatDate } from '../../utils/utils'
import { ArticleType } from '../../types'

const Article: FC<ArticleType> = ({ name, author, image, date, content }) => {
  const sliceContent = content.split(' ').slice(0, 60).join(' ') + ' ...'
  return (
    <article className={styles.main}>
      <Link href='/'>
        <a className={styles.image_link}>
          <Image
            className={styles.image}
            src={image}
            alt={name}
            layout='responsive'
            width={700}
            height={400}
          />
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
        <div className={styles.text}>{sliceContent}</div>
        <Link href='/'>
          <a className={styles.link}>Подробнее</a>
        </Link>
      </div>
    </article>
  )
}

export default Article
