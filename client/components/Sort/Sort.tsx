import { useState, FC, SetStateAction } from 'react'
import styles from './sort.module.scss'
import Arrow from '../Icons/Arrow'

const Sort: FC = () => {
  const [dateState, setDateState] = useState<SetStateAction<null | string>>(null)
  const [viewsState, setViewsState] = useState<SetStateAction<null | string>>(null)

  return (
    <section className={styles.main}>
      <div className={styles.name}>Сортировать:</div>
      <div className={styles.date}>
        <span
          className={styles.category}
          style={{ textDecoration: dateState === null ? 'none' : 'underline' }}
        >
          по дате
        </span>
        <button
          onClick={() => {
            if (dateState === 'more') {
              return
            }
            setDateState('more')
          }}
        >
          <span className='visually-hidden'>От большего</span>
          <Arrow />
        </button>
        <button
          onClick={() => {
            if (dateState === 'less') {
              return
            }
            setDateState('less')
          }}
          style={{ transform: 'rotate(180deg)' }}
        >
          <span className='visually-hidden'>От меньшего</span>
          <Arrow />
        </button>
      </div>
      <div className={styles.views}>
        <span
          className={styles.category}
          style={{ textDecoration: viewsState === null ? 'none' : 'underline' }}
        >
          по количеству просмотров
        </span>
        <button
          onClick={() => {
            if (viewsState === 'more') {
              return
            }
            setViewsState('more')
          }}
        >
          <span className='visually-hidden'>От большего</span>
          <Arrow />
        </button>
        <button
          onClick={() => {
            if (viewsState === 'less') {
              return
            }
            setViewsState('less')
          }}
          style={{ transform: 'rotate(180deg)' }}
        >
          <span className='visually-hidden'>От меньшего</span>
          <Arrow />
        </button>
      </div>
    </section>
  )
}

export default Sort
