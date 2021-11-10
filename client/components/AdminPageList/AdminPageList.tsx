import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './admin-page-list.module.scss';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import AdminEditPage from "../AdminEditPage/AdminEditPage";

const pages = [
  {
    name: 'Проекты',
    slug: 'proekti',
  },
  {
    name: 'Наши книги',
    slug: 'nashi-knigi',
  },
  {
    name: 'О нас',
    slug: 'o-nas',
  },
  {
    name: 'Поддержать',
    slug: 'podderzhat',
  },
]

const AdminPageList: FC = () => {
  const [isEditor, setIsEditor] = useState(false);
  const [page, setPage] = useState(pages[0])

  const { request } = useHttp();

  return (
    <section className={styles.main}>
      {isEditor ? <AdminEditPage setIsEditor={setIsEditor} slug={page.slug} name={page.name} /> : <>
        <h2 className={styles.articles__titile}>Страницы</h2>
        <p>
          Здесь находятся страницы, на которые можно попасть по ссылке из меню в шапке сайта и которые не формируются автоматически
        </p>
        <ul className={styles.list}>
          {pages.map((it, i) => {
            return <li className={styles.item} key={i} onClick={() => {
            setPage(it)
            setIsEditor(true)}
            }>{it.name}</li>
          })}
        </ul></>}
    </section>
  );
};

export default AdminPageList;
