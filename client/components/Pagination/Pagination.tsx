import { FC } from 'react'
import styles from './pagination.module.scss'
import Arrow from '../Icons/Arrow'

const Pagination: FC = () => {
  return (
    <section className={styles.main}>
      <div className={styles.name}>Сортировать:</div>
      <div className={styles.date}>
        <span>по дате</span>
        <button>
          <span className='visually-hidden'>От большего</span>
          <Arrow />
        </button>
        <button>
          <span className='visually-hidden'>От меньшего</span>
          <span className={styles.revert}>
            <Arrow />
          </span>
        </button>
      </div>
      <div className={styles.views}>
        <span>по количеству просмотров</span>
        <button>
          <span className='visually-hidden'>От большего</span>
          <Arrow />
        </button>
        <button>
          <span className='visually-hidden'>От меньшего</span>
          <span className={styles.revert}>
            <Arrow />
          </span>
        </button>
      </div>
    </section>
  )
}

export default Pagination
