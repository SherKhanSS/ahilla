import { FC, useEffect, useState } from 'react';
import styles from './admin-publication-list.module.scss';
import Spinner from '../Icons/Spinner';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import SearchIcon from '../Icons/SearchIcon';
import Pagination from 'react-js-pagination';
import AdminTable from '../AdminTable/AdminTable';
import { useContextState } from '../../context/state';

const ITEMS_COUNT_DEFAULT = 30;
const TRIMMING_DATE = 10;

const AdminPublicationList: FC<{
  callback: (view: string) => void;
}> = ({ callback }) => {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isInputFill, setIsInputFill] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [dates, setDates] = useState({ start: '', end: '' });
  const { request } = useHttp();
  const { setCurrentEntityId } = useContextState();

  useEffect(() => {
    if (dates.start !== '' && dates.end !== '') {
      (async () => {
        try {
          const articles = await request(
            `${domainURL}/api/publications/admins/date-list/${dates.start}/${dates.end}`
          );
          setArticles(articles);
        } catch (err) {}
      })();
    }
  }, [dates.end, dates.start, request]);

  useEffect(() => {
    if (!isInputFill && !isSent && dates.start === '' && dates.end === '') {
      (async () => {
        const start = (activePage - 1) * ITEMS_COUNT_DEFAULT;
        try {
          const { articles, count } = await request(
            `${domainURL}/api/publications/admins/list/${start}`
          );
          setArticles(articles);
          setArticlesCount(count);
        } catch (err) {}
      })();
    }
  }, [activePage, dates.end, dates.start, isInputFill, isSent, request]);

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber === activePage) {
      return;
    }
    setActivePage(pageNumber);
  };
  const handlePublished = async (id: number) => {
    setIsSent(true);
    try {
      const res = await request(
        `${domainURL}/api/publications/admins/status/${id}`
      );
      if (res.status === 200) {
        setIsSent(false);
      } else {
        setIsSent(false);
        alert('Что-то пошло не так!');
      }
    } catch (err) {
      setIsSent(false);
      alert('Что-то пошло не так!');
    }
  };

  const handleEdit = (id: number) => {
    setCurrentEntityId(id);
    callback(privateViewStates.editPublication);
  };

  const handleNew = () => {
    setCurrentEntityId(null);
    callback(privateViewStates.editPublication);
  };

  const handleDelete = async (id: number) => {
    setIsSent(true);
    try {
      const res = await request(
        `${domainURL}/api/publications/${id}`,
        'DELETE'
      );
      if (res.status === 200) {
        setIsSent(false);
      } else {
        setIsSent(false);
        alert('Что-то пошло не так!');
      }
    } catch (err) {
      alert('Что-то пошло не так!');
      setIsSent(false);
    }
  };

  return (
    <section className={styles.main}>
      {isSent && (
        <div className={styles.spinner_wrap}>
          <Spinner />
        </div>
      )}
      <section className={styles.articles}>
        <div className={styles.top_wrap}>
          <h2 className={styles.articles__titile}>Публикации</h2>
          <button onClick={handleNew}>Создать новую</button>
        </div>
        <div className={styles.search__wrap}>
          <div className={styles.search}>
            <div className={styles.search__icon}>
              <SearchIcon />
            </div>
            <input
              id={'search'}
              type={'text'}
              onChange={async (event) => {
                setIsSearch(true);
                const str = event.target.value;

                if (str === '') {
                  setArticles([]);
                  setIsInputFill(false);
                  setIsSearch(false);
                  setActivePage(1);
                } else {
                  setIsInputFill(true);
                }

                if (str !== '') {
                  try {
                    const response = await request(
                      `${domainURL}/api/publications/search/${str.toLowerCase()}`
                    );

                    if (response.status === 404) {
                      setArticles([]);
                      setIsSearch(false);
                      return;
                    }

                    setArticles(response);
                    setIsSearch(false);
                  } catch (err) {
                    setArticles([]);
                    setIsSearch(false);
                  }
                }
              }}
            />
            <div>{isSearch && <Spinner />}</div>
          </div>
          <div className={styles.date}>
            <label>
              Начало выборки
              <input
                type={'date'}
                value={dates.start.slice(0, TRIMMING_DATE) ?? ''}
                onChange={(e) => {
                  setDates({
                    ...dates,
                    start: e.target.value,
                  });
                }}
              />
            </label>
            <label>
              Конец выборки (минимум день)
              <input
                type={'date'}
                value={dates.end.slice(0, TRIMMING_DATE) ?? ''}
                onChange={(e) => {
                  setDates({
                    ...dates,
                    end: e.target.value,
                  });
                }}
              />
            </label>
            <button
              onClick={() => {
                setDates({
                  start: '',
                  end: '',
                });
              }}
            >
              Очистить даты
            </button>
          </div>
        </div>
        <AdminTable
          options={articles}
          isPublications={true}
          handlePublished={handlePublished}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <section className={styles.pagination}>
          {!isInputFill && (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={ITEMS_COUNT_DEFAULT}
              totalItemsCount={articlesCount}
              onChange={handlePageChange}
              hideDisabled={true}
              prevPageText={'<'}
              firstPageText={'<<'}
              nextPageText={'>'}
              lastPageText={'>>'}
            />
          )}
        </section>
      </section>
    </section>
  );
};

export default AdminPublicationList;
