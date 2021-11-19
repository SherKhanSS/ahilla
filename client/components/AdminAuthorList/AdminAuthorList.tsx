import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './admin-author-list.module.scss';
import Spinner from '../Icons/Spinner';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import SearchIcon from '../Icons/SearchIcon';
import Pagination from 'react-js-pagination';
import AdminTable from '../AdminTable/AdminTable';
import { useContextState } from '../../context/state';

const ITEMS_COUNT_DEFAULT = 30;

const AdminAuthorList: FC<{
  callback: (view: string) => void;
}> = ({ callback }) => {
  const [authors, setAuthors] = useState([]);
  const [authorsCount, setAuthorsCount] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isInputFill, setIsInputFill] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const { request } = useHttp();
  const { setCurrentEntityId } = useContextState();

  useEffect(() => {
    if (!isInputFill && !isSent) {
      (async () => {
        const start = (activePage - 1) * ITEMS_COUNT_DEFAULT;
        try {
          const { authors, count } = await request(
            `${domainURL}/api/authors/admins/list/${start}`
          );
          setAuthors(authors);
          setAuthorsCount(count);
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

  const handleEdit = (id: number) => {
    setCurrentEntityId(id);
    callback(privateViewStates.editAuthor);
  };

  const handleNew = () => {
    setCurrentEntityId(null);
    callback(privateViewStates.editAuthor);
  };

  const handleDelete = async (id: number) => {
    setIsSent(true);
    try {
      const res = await request(`${domainURL}/api/authors/${id}`, 'DELETE');
      if (res.status === 200) {
        setIsSent(false);
        alert('Удалено!');
      } else {
        setIsSent(false);
        alert('Что-то пошло не так!');
      }
    } catch (err) {
      alert('Что-то пошло не так!');
      setIsSent(false);
    }
  };

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsSearch(true);
    const str = event.target.value;

    if (str === '') {
      setAuthors([]);
      setIsInputFill(false);
      setIsSearch(false);
      setActivePage(1);
    } else {
      setIsInputFill(true);
    }

    if (str !== '') {
      try {
        const response = await request(
          `${domainURL}/api/authors/search/${str}`
        );

        if (response.status === 404 || response.status === 500) {
          setAuthors([]);
          setIsSearch(false);
          return;
        }

        setAuthors(response);
        setIsSearch(false);
      } catch (err) {
        setAuthors([]);
        setIsSearch(false);
      }
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
          <h2 className={styles.articles__titile}>Авторы</h2>
          <button onClick={handleNew}>Создать нового</button>
        </div>
        <div className={styles.search__wrap}>
          <div className={styles.search}>
            <div className={styles.search__icon}>
              <SearchIcon />
            </div>
            <input id={'search'} type={'text'} onChange={handleSearch} />
            <div>{isSearch && <Spinner />}</div>
          </div>
        </div>
        <AdminTable
          options={authors}
          isPublications={false}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handlePublished={() => {}}
        />
        <section className={styles.pagination}>
          {!isInputFill && (
            <Pagination
              activePage={activePage}
              itemsCountPerPage={ITEMS_COUNT_DEFAULT}
              totalItemsCount={authorsCount}
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

export default AdminAuthorList;
