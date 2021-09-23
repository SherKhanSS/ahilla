import { FC } from 'react'
import styles from './tags.module.scss'
import Link from 'next/link'
import {useTagsState} from "../../context/tags";

const Tags: FC = () => {
  const { tags } = useTagsState();
  const tagsSlice = tags.slice(0, 10)
  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Поиск по меткам</h2>
      <ul className={styles.list}>
        {tagsSlice.map((it, i) => {
          return (
            <li className={styles.item} key={i}>
              <Link href='/'>
                <a className={styles.link}>{it.name}</a>
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
