import { useState, FC, SetStateAction, ReactElement, useEffect } from 'react';
import styles from './sort.module.scss';
import Arrow from '../Icons/Arrow';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Pagination from 'react-js-pagination';

const ITEMS_COUNT_DEFAULT = 10;
const LAST_FIRST = 0;
const FIRST_FIRST = 1;
const DATE_SORT = 'updated_at';
const VIEWS_SORT = 'views';

const Sort: FC<{
  children: ReactElement;
  path: string;
  count: number;
  id?: string;
}> = ({ children, path, count, id }) => {
  const router = useRouter();
  const { query } = router;
  const { order, sort, page } =
    query.order && query.sort && query.page
      ? query
      : { order: 0, sort: 'updated_at', page: 1 };
  const initialPage = page ?? 1;
  const [activePage, setActivePage] = useState(+initialPage);
  const compositePath = id === undefined ? path : `${path}/${id}`;
  const selectivePath = id === undefined ? path : id;

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber === activePage) {
      return;
    }

    setActivePage(pageNumber);
    await router.push(
      `${selectivePath}?order=${order}&sort=${sort}&page=${pageNumber}`
    );
  };

  return (
    <>
      <section className={styles.main}>
        <div className={styles.name}>Сортировать:</div>
        <div className={styles.date}>
          <span className={styles.category}>по дате</span>
          <Link
            href={`/${compositePath}?order=${LAST_FIRST}&sort=${DATE_SORT}&page=${page}`}
          >
            <a className={styles.button}>
              <span className="visually-hidden">От большего</span>
              <Arrow
                fill={
                  order !== undefined &&
                  sort === DATE_SORT &&
                  +order === LAST_FIRST
                    ? '#9cd382'
                    : '#000'
                }
              />
            </a>
          </Link>
          <Link
            href={`/${compositePath}?order=${FIRST_FIRST}&sort=${DATE_SORT}&page=${page}`}
          >
            <a className={styles.button}>
              <span className="visually-hidden">От меньшего</span>
              <Arrow
                fill={
                  order !== undefined &&
                  sort === DATE_SORT &&
                  +order === FIRST_FIRST
                    ? '#9cd382'
                    : '#000'
                }
              />
            </a>
          </Link>
        </div>
        <div className={styles.views}>
          <span className={styles.category}>по количеству просмотров</span>
          <Link
            href={`/${compositePath}?order=${LAST_FIRST}&sort=${VIEWS_SORT}&page=${page}`}
          >
            <a className={styles.button}>
              <span className="visually-hidden">От большего</span>
              <Arrow
                fill={
                  order !== undefined &&
                  sort === VIEWS_SORT &&
                  +order === LAST_FIRST
                    ? '#9cd382'
                    : '#000'
                }
              />
            </a>
          </Link>
          <Link
            href={`/${compositePath}?order=${FIRST_FIRST}&sort=${VIEWS_SORT}&page=${page}`}
          >
            <a className={styles.button}>
              <span className="visually-hidden">От меньшего</span>
              <Arrow
                fill={
                  order !== undefined &&
                  sort === VIEWS_SORT &&
                  +order === FIRST_FIRST
                    ? '#9cd382'
                    : '#000'
                }
              />
            </a>
          </Link>
        </div>
      </section>
      {children}
      <section className={styles.pagination}>
        {count > ITEMS_COUNT_DEFAULT && (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={ITEMS_COUNT_DEFAULT}
            totalItemsCount={count}
            onChange={handlePageChange}
            hideDisabled={true}
            prevPageText={'<'}
            firstPageText={'<<'}
            nextPageText={'>'}
            lastPageText={'>>'}
            getPageUrl={(i) =>
              `${compositePath}?order=${FIRST_FIRST}&sort=${VIEWS_SORT}&page=${i}`
            }
          />
        )}
      </section>
    </>
  );
};

export default Sort;
