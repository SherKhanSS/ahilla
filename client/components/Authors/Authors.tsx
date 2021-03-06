import { useEffect, useState, FC, SetStateAction } from 'react'
import Link from 'next/link'
import articles from '../../mocks/articles'
import styles from './authors.module.scss'
import Arrow from '../Icons/Arrow'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const MOBILE_WIDTH = 660

const authors = Array.from(new Set(articles.map((it) => it.author)))

const alphabet = Array.from(new Set(authors.map((it) => it.slice(0, 1)))).sort(
  (a, b) => a.localeCompare(b)
)

const Authors: FC = () => {
  const { width } = useWindowDimensions()
  const [isMobile, setIsMobile] = useState(false)
  const [currentSymbol, setCurrentSymbol] = useState(alphabet[0])
  const [isSlice, setIsSlice] = useState(true)
  const [currentAuthors, setCurrentAuthors] = useState<SetStateAction<any>>([])

  useEffect(() => {
    const isMobile = width === null ? false : width < MOBILE_WIDTH
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
                  className={isActive ? styles.button__active : styles.button}
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
        <h2 className={styles.title}>????????????</h2>
        <div className={styles.description}>
          ???? ???????? ???????????????? ???? ???????????? ?????????? ?????? ???????????? ?????????? ??????????????, ????????????
          ?????????? ???? ??????/?????????????? ?????????????? ????????????:
        </div>
        <ul className={styles.authors_list}>
          {currentAuthors?.map((it: string, i: number) => {
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
