import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './admin-document-list.module.scss';
import Spinner from '../Icons/Spinner';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import SearchIcon from '../Icons/SearchIcon';
import Pagination from 'react-js-pagination';
import AdminDocumentsTable from '../AdminDocumentsTable/AdminDocumentsTable';
import AdminEditDocument from '../AdminEditDocument/AdminEditDocument';

const ITEMS_COUNT_DEFAULT = 30;
const TRIMMING_DATE = 10;

const documentCategoryList = [
  {
    name: 'Все',
    category: 'all',
  },
  {
    name: 'Изображения',
    category: 'image',
  },
  {
    name: 'Документы',
    category: 'other',
  },
];

const AdminDocumentList: FC<{
  handleInsertImage?: (link: string) => void;
}> = ({ handleInsertImage }) => {
  const [tags, setTags] = useState([]);
  const [tagsCount, setTagsCount] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isInputFill, setIsInputFill] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [options, setOptions] = useState({
    dateStart: '',
    dateEnd: '',
    category: 'all',
  });
  const { request } = useHttp();
  const [currentEntityId, setCurrentEntityId] = useState<null | number>(null);
  const [isShowEdit, setIsShowEdit] = useState(false);

  useEffect(() => {
    if (!isInputFill && !isSent && !isShowEdit) {
      (async () => {
        const start = (activePage - 1) * ITEMS_COUNT_DEFAULT;
        const dateStart = options.dateStart || 0;
        const dateEnd = options.dateEnd || 0;

        try {
          const { tags, count } = await request(
            `${domainURL}/api/documents/admins/list/${start}/${dateStart}/${dateEnd}/${options.category}`
          );
          setTags(tags);
          setTagsCount(count);
        } catch (err) {}
      })();
    }
  }, [
    activePage,
    isInputFill,
    isSent,
    isShowEdit,
    options.category,
    options.dateEnd,
    options.dateStart,
    request,
  ]);

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber === activePage) {
      return;
    }
    setActivePage(pageNumber);
  };

  const handleEdit = (id: number) => {
    setCurrentEntityId(id);
    setIsShowEdit(true);
  };

  const handleNew = () => {
    setCurrentEntityId(null);
    setIsShowEdit(true);
  };

  const handleDelete = async (id: number) => {
    setIsSent(true);
    try {
      const res = await request(`${domainURL}/api/documents/${id}`, 'DELETE');
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
      {isShowEdit && (
        <AdminEditDocument
          currentEntityId={currentEntityId}
          setId={setCurrentEntityId}
          callback={setIsShowEdit}
        />
      )}
      <section className={styles.articles}>
        {handleInsertImage === undefined && (
          <div className={styles.top_wrap}>
            <h2 className={styles.articles__titile}>Файлы</h2>
            <button onClick={handleNew}>Создать новый</button>
          </div>
        )}
        <div className={styles.search__wrap}>
          <div className={styles.search}>
            <div className={styles.search__icon}>
              <SearchIcon />
            </div>
            <input id={'search'} type={'text'} onChange={handleSearch} />
            <div>{isSearch && <Spinner />}</div>
            {handleInsertImage !== undefined && (
              <button
                className={styles.delete}
                onClick={() => {
                  handleInsertImage('/img/youtobe-back.jpg');
                }}
              >
                +
              </button>
            )}
          </div>
        </div>
        <div className={styles.date}>
          <label>
            Начало выборки
            <input
              type={'date'}
              value={options.dateStart.slice(0, TRIMMING_DATE) ?? ''}
              onChange={(e) => {
                setOptions({
                  ...options,
                  dateStart: e.target.value,
                });
              }}
            />
          </label>
          <label>
            Конец выборки (минимум день)
            <input
              type={'date'}
              value={options.dateEnd.slice(0, TRIMMING_DATE) ?? ''}
              onChange={(e) => {
                setOptions({
                  ...options,
                  dateEnd: e.target.value,
                });
              }}
            />
          </label>
          <label>
            Категория документа
            <select
              value={options.category}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setOptions({
                  ...options,
                  category: e.target.value,
                });
              }}
            >
              {documentCategoryList.map((it, i) => {
                return (
                  <option value={it.category} key={i}>
                    {it.name}
                  </option>
                );
              })}
            </select>
          </label>
          <button
            onClick={() => {
              setOptions({
                dateStart: '',
                dateEnd: '',
                category: 'all',
              });
            }}
          >
            Очистить все
          </button>
        </div>
        <AdminDocumentsTable
          options={tags}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleInsertImage={handleInsertImage}
        />
        <section className={styles.pagination}>
          {!isInputFill && tagsCount > ITEMS_COUNT_DEFAULT && (
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
