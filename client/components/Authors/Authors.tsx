import { useEffect, useState, FC, SetStateAction } from 'react';
import Link from 'next/link';
import styles from './authors.module.scss';
import Arrow from '../Icons/Arrow';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { AuthorType, TagType } from '../../types';

const MOBILE_WIDTH = 660;

const Authors: FC<{
  authors: AuthorType[] | TagType[];
  path: string;
  title: string;
  description: string;
}> = ({ authors, path, title, description }) => {
  const alphabet = Array.from(
    new Set(authors.map((it) => it.name.slice(0, 1).toUpperCase()))
  ).sort((a, b) => a.localeCompare(b));

  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState(false);
  const [currentSymbol, setCurrentSymbol] = useState(alphabet[0]);
  const [isSlice, setIsSlice] = useState(true);
  const [currentAuthors, setCurrentAuthors] = useState<SetStateAction<any>>([]);

  useEffect(() => {
    const isMobile = width === null ? false : width < MOBILE_WIDTH;
    setIsMobile(isMobile);
    setIsSlice(isMobile);
  }, [width]);

  useEffect(() => {
    const selectedAuthors = authors.filter(
      (it) => it.name[0].toUpperCase() === currentSymbol
    );
    setCurrentAuthors(selectedAuthors);
  }, [authors, currentSymbol]);

  const mobileAlphabet = isSlice ? alphabet.slice(0, 3) : alphabet;

  return (
    <section className={styles.main}>
      <div className={styles.tabs}>
        <ul className={styles.tabs_list}>
          {mobileAlphabet.map((it, i) => {
            const isActive = it === currentSymbol;
            return (
              <li className={styles.tabs_item} key={i}>
                <button
                  className={isActive ? styles.button__active : styles.button}
                  onClick={() => setCurrentSymbol(it)}
                >
                  {it}
                </button>
              </li>
            );
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
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.description}>{description}</div>
        <ul className={styles.authors_list}>
          {currentAuthors?.map((it: any, i: number) => {
            return (
              <li className={styles.authors_item} key={i}>
                <Link href={`/${path}/${it.id}?order=0&sort=date&page=1`}>
                  <a className={styles.authors_link}>{it.name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Authors;
