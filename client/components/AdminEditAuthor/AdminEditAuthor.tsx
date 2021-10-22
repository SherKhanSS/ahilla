import { FC, useEffect, useState } from 'react';
import styles from './admin-edit-author.module.scss';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

const transliteration = new cyrillicToTranslit();

const MAX_TITLE = 100;

const initialAuthor = {
  name: '',
  slug: '',
};

const AdminEditAuthor: FC<{
  currentEntityId: number | null;
  callback: (view: string) => void;
  setId: (id: number | null) => void;
}> = ({ currentEntityId, callback, setId }) => {
  const [author, setAuthor] = useState(initialAuthor);
  const { request } = useHttp();

  useEffect(() => {
    if (currentEntityId !== null) {
      (async () => {
        try {
          const author = await request(
            `${domainURL}/api/authors/${currentEntityId}`
          );
          setAuthor(author);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [currentEntityId, request]);

  const handleSubmit = async () => {
    try {
      const res =
        currentEntityId === null
          ? await request(`${domainURL}/api/authors`, 'POST', author)
          : await request(
              `${domainURL}/api/authors/${currentEntityId}`,
              'PUT',
              author
            );
      if (res.status === 201) {
        alert('Успешно');
        setId(null);
        callback(privateViewStates.authors);
      } else {
        alert('Что-то пошло не так');
      }
    } catch (err) {
      console.log(err);
      alert('Что-то пошло не так');
    }
  };

  return (
    <section className={styles.main}>
      <label>
        Имя автора (придется придерживаться начатой традиции - сан, имя,
        фамилия)
        <input
          type={'text'}
          value={author.name}
          maxLength={MAX_TITLE}
          onChange={(e) => {
            setAuthor({
              ...author,
              name: e.target.value,
              slug: transliteration
                .transform(e.target.value, '-')
                .toLowerCase(),
            });
          }}
        />
      </label>
      <label>
        Slug (только для чтения)
        <input readOnly={true} type={'text'} value={author.slug} />
      </label>
      <div className={styles.buttons}>
        <button onClick={handleSubmit}>Сохранить</button>
        <button
          onClick={() => {
            callback(privateViewStates.authors);
            setId(null);
          }}
        >
          Вернуться к списку
        </button>
      </div>
    </section>
  );
};

export default AdminEditAuthor;
