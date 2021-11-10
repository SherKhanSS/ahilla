import { FC, useEffect, useState } from 'react';
import styles from './admin-edit-page.module.scss';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('../AdminEditor/AdminEditor'), {
  ssr: false,
});

const initialPage = {
  slug: '',
  content: 'Наполните страницу',
};

const AdminEditPage: FC<{
  setIsEditor: (status: boolean) => void;
  slug: string;
  name: string;
}> = ({ setIsEditor, slug, name }) => {
  const [page, setPage] = useState({...initialPage,
  slug});
  const { request } = useHttp();

  useEffect(() => {
      (async () => {
        try {
          const page = await request(
            `${domainURL}/api/pages/${slug}`
          );
          setPage(page);
        } catch (err) {
          console.log(err);
        }
      })();
  }, [request, slug]);

  const onChangeEditor = (data: string) => {
    setPage({
      ...page,
      content: data,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await request(
              `${domainURL}/api/pages/${slug}`,
              'PUT',
              page
            );

      if (res.status === 201) {
        setIsEditor(false);
      } else {
        alert('Что-то пошло не так');
      }
    } catch (err) {
      console.log(err);
      alert('Что-то пошло не так');
    }
  };

  return (
    <>
      <div className={styles.name}>Содержание {name}</div>
      <Editor initial={page.content} onChangeEditor={onChangeEditor} />
      <div className={styles.buttons}>
        <button
          onClick={async () => {
            await handleSubmit();
          }}
        >
          Сохранить
        </button>
        <button
          onClick={() => {
            setIsEditor(false);
          }}
        >
          Вернуться к списку
        </button>
      </div>
    </>
  );
};

export default AdminEditPage;
