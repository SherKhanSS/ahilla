import { FC, useEffect, useState } from 'react';
import styles from './admin-edit-tag.module.scss';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import cyrillicToTranslit from 'cyrillic-to-translit-js';

const transliteration = new cyrillicToTranslit();

const MAX_TITLE = 100;

const initialTag = {
  name: '',
  slug: '',
};

const AdminEditTag: FC<{
  currentEntityId: number | null;
  callback: (view: string) => void;
  setId: (id: number | null) => void;
}> = ({ currentEntityId, callback, setId }) => {
  const [tag, setTag] = useState(initialTag);
  const { request } = useHttp();

  useEffect(() => {
    if (currentEntityId !== null) {
      (async () => {
        try {
          const tag = await request(`${domainURL}/api/tags/${currentEntityId}`);
          setTag(tag);
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
          ? await request(`${domainURL}/api/tags`, 'POST', tag)
          : await request(
              `${domainURL}/api/tags/${currentEntityId}`,
              'PUT',
              tag
            );
      if (res.status === 201) {
        setId(null);
        callback(privateViewStates.tags);
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
        Название тега
        <input
          type={'text'}
          value={tag.name}
          maxLength={MAX_TITLE}
          onChange={(e) => {
            setTag({
              ...tag,
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
        <input readOnly={true} type={'text'} value={tag.slug} />
      </label>
      <div className={styles.buttons}>
        <button onClick={handleSubmit}>Сохранить</button>
        <button
          onClick={() => {
            callback(privateViewStates.tags);
            setId(null);
          }}
        >
          Вернуться к списку
        </button>
      </div>
    </section>
  );
};

export default AdminEditTag;
