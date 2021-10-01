import { FC, useState } from 'react';
import styles from './search.module.scss';
import ArticleInner from '../ArticleInner/ArticleInner';
import { ArticleType } from '../../types';
import Spinner from '../Icons/Spinner';

const domainURL = process.env.NEXT_PUBLIC_DOMAIN_URL;

const Search: FC = () => {
  const [articles, setArticles] = useState([]);
  const [isSent, setIsSent] = useState(false);
  const [isInputFill, setIsInputFill] = useState(false);
  const info =
    isInputFill && articles.length === 0 && !isSent
      ? 'Ничего не найдено!'
      : articles.length !== 0
      ? 'Результаты поиска:'
      : '';

  return (
    <section className={styles.main}>
      <section className={styles.articles}>
        <h2 className={styles.articles__titile}>Поиск</h2>
        <div className={styles.search__wrap}>
          <label htmlFor={'search'}>Введите слова для поиска</label>
          <div className={styles.search}>
            <input
              id={'search'}
              type={'text'}
              onChange={async (event) => {
                setIsSent(true);
                const str = event.target.value;

                if (str === '') {
                  setIsInputFill(false);
                } else {
                  setIsInputFill(true);
                }

                try {
                  const response = await fetch(
                    `${domainURL}/publications/search/${str}`
                  );
                  const foundArticles = await response.json();
                  setArticles(foundArticles);
                  setIsSent(false);
                } catch (err) {
                  setArticles([]);
                  setIsSent(false);
                }
              }}
            />
            <div>{isSent && <Spinner />}</div>
          </div>
          <div>{info}</div>
        </div>
        <ul className={styles.articles__list}>
          {articles.map((it: ArticleType, i: number) => {
            return (
              <li className={styles.articles__item} key={i}>
                <ArticleInner {...it} />
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};

export default Search;
