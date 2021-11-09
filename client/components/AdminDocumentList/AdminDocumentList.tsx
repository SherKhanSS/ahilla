import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './admin-document-list.module.scss';
import Spinner from '../Icons/Spinner';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import SearchIcon from '../Icons/SearchIcon';
import Pagination from 'react-js-pagination';
import AdminTable from '../AdminTable/AdminTable';

const ITEMS_COUNT_DEFAULT = 30;

const AdminDocumentList: FC<{
  callback: (view: string) => void;
  setId: (id: number | null) => void;
}> = ({ callback, setId }) => {
  const [tags, setTags] = useState([]);
  const [tagsCount, setTagsCount] = useState(0);
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
          const { tags, count } = await request(
            `${domainURL}/api/documents/admins/list/${start}`
          );
          setTags(tags);
          setTagsCount(count);
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
    localStorage.setItem('currentEntityId', `${id}`);
    callback(privateViewStates.editDocument);
    setId(id);
  };

  const handleNew = () => {
    localStorage.removeItem('currentEntityId');
    callback(privateViewStates.editDocument);
    setId(null);
  };

  const handleDelete = async (id: number) => {
    setIsSent(true);
    try {
      const res = await request(`${domainURL}/api/documents/${id}`, 'DELETE');
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
      setTags([]);
      setIsInputFill(false);
      setIsSearch(false);
      setActivePage(1);
    } else {
      setIsInputFill(true);
    }

    if (str !== '') {
      try {
        const response = await request(
          `${domainURL}/api/documents/search/${str}`
        );

        if (response.status === 404 || response.status === 500) {
          setTags([]);
          setIsSearch(false);
          return;
        }

        setTags(response);
        setIsSearch(false);
      } catch (err) {
        setTags([]);
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
        <p>
          Раздел для загрузки используемых в материалах документов - книг, pdf,
          вордовских файлов и т.д. Так же здесь можно хранить часто используемые
          постеры для публикаций и вставлять их отсюда ссылкой
        </p>
        <div className={styles.top_wrap}>
          <h2 className={styles.articles__titile}>Файлы</h2>
          <button onClick={handleNew}>Создать новый</button>
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
          options={tags}
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
              totalItemsCount={tagsCount}
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

export default AdminDocumentList;
