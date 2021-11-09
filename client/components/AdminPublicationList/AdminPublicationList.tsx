import { FC, useEffect, useState } from 'react';
import styles from './admin-publication-list.module.scss';
import Spinner from '../Icons/Spinner';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import SearchIcon from '../Icons/SearchIcon';
import Pagination from 'react-js-pagination';
import AdminTable from '../AdminTable/AdminTable';

const ITEMS_COUNT_DEFAULT = 30;

const AdminPublicationList: FC<{
  callback: (view: string) => void;
  setId: (id: number | null) => void;
}> = ({ callback, setId }) => {
  const [articles, setArticles] = useState([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isInputFill, setIsInputFill] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const { request } = useHttp();

  useEffect(() => {
    if (!isInputFill && !isSent) {
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
  }, [activePage, isInputFill, isSent, request]);

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
    localStorage.setItem('currentEntityId', `${id}`);
    callback(privateViewStates.editPublication);
    setId(id);
  };

  const handleNew = () => {
    localStorage.removeItem('currentEntityId');
    callback(privateViewStates.editPublication);
    setId(null);
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
