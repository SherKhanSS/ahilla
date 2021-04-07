import styles from './archives.module.scss'

const Archives = () => {
  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Архивы:</h2>
      <select>
        <option>select1</option>
        <option>select2</option>
        <option>select3</option>
      </select>
    </section>
  )
}

export default Archives
