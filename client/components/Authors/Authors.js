import Link from 'next/link'
import articles from '../../mocks/articles'
import styles from './authors.module.scss'
import Arrow from '../Icons/Arrow'
import { useEffect, useState } from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const MOBILE_WIDTH = 660

const authors = [...new Set(articles.map((it) => it.author))]

const alphabet = [
  ...new Set(authors.map((it) => it.slice(0, 1))),
].sort((a, b) => a.localeCompare(b))

const Authors = () => {
  const { width } = useWindowDimensions()
  const [isMobile, setIsMobile] = useState(false)
  const [currentSymbol, setCurrentSymbol] = useState(alphabet[0])
  const [isSlice, setIsSlice] = useState(true)
  const [currentAuthors, setCurrentAuthors] = useState([])

  useEffect(() => {
    const isMobile = width < MOBILE_WIDTH
    setIsMobile(isMobile)
    setIsSlice(isMobile)
  }, [width])

  useEffect(() => {
    const selectedAuthors = authors.filter((it) => it[0] === currentSymbol)
    setCurrentAuthors(selectedAuthors)
  }, [currentSymbol])

  const mobileAlphabet = isSlice ? alphabet.slice(0, 3) : alphabet

  return (
    <section className={styles.main}>
      <div className={styles.tabs}>
        <ul className={styles.tabs_list}>
          {mobileAlphabet.map((it, i) => {
            const isActive = it === currentSymbol
            return (
              <li className={styles.tabs_item} key={i}>
                <button
                  className={
                    isActive
                      ? styles.button__active
                      : styles.button
                  }
                  onClick={() => setCurrentSymbol(it)}
                >
                  {it}
                </button>
              </li>
            )
          })}
          {isMobile && (
            <li className={styles.tabs_item}>
              <button
                className={styles.arrow_button}
                onClick={() => setIsSlice(!isSlice)}
                style={{
                  transform: !isSlice ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <Arrow />
              </button>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.authors}>
        <h2 className={styles.title}>Авторы</h2>
        <div className={styles.description}>
          На этой странице вы можете найти все тексты наших авторов, просто
          нажав на имя/фамилию нужного автора:
        </div>
        <ul className={styles.authors_list}>
          {currentAuthors.map((it, i) => {
            return (
              <li className={styles.authors_item} key={i}>
                <Link href={'/'}>
                  <a className={styles.authors_link}>{it}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default Authors
