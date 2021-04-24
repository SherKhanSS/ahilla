import styles from './archives.module.scss'

const Archives = () => {
  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Архивы:</h2>
      <div className={styles.wrap}>
        <select>
          <option>select1</option>
          <option>select2</option>
          <option>select3</option>
        </select>
      </div>
    </section>
  )
}

export default Archives
