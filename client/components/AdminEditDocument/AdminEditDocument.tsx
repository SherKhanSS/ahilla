import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './admin-edit-document.module.scss';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { saveToServer } from '../../utils';

const transliteration = new cyrillicToTranslit();

const MAX_TITLE = 100;

const initialTag = {
  name: '',
  slug: '',
};

const AdminEditDocument: FC<{
  currentEntityId: number | null;
  callback: (view: string) => void;
  setId: (id: number | null) => void;
}> = ({ currentEntityId, callback, setId }) => {
  const [document, setDocument] = useState(initialTag);
  const { request } = useHttp();

  useEffect(() => {
    if (currentEntityId !== null) {
      (async () => {
        try {
          const document = await request(
            `${domainURL}/api/documents/${currentEntityId}`
          );
          setDocument(document);
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
          ? await request(`${domainURL}/api/documents`, 'POST', document)
          : await request(
              `${domainURL}/api/documents/${currentEntityId}`,
              'PUT',
              document
            );
      if (res.status === 201) {
        setId(null);
        callback(privateViewStates.documents);
      } else {
        alert('Что-то пошло не так');
      }
    } catch (err) {
      console.log(err);
      alert('Что-то пошло не так');
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      const urlImg = await saveToServer(file);
      setDocument({
        ...document,
        slug: urlImg,
      });
    }
  };

  return (
    <section className={styles.main}>
      <label>
        Название файла
        <input type="file" onChange={handleChange} />
      </label>
      <label>
        Название файла
        <input
          type={'text'}
          value={document.name}
          maxLength={MAX_TITLE}
          onChange={(e) => {
            setDocument({
              ...document,
              name: e.target.value,
            });
          }}
        />
      </label>
      <label>
        Slug (только для чтения)
        <input readOnly={true} type={'text'} value={document.slug} />
      </label>
      <div className={styles.buttons}>
        <button onClick={handleSubmit}>Сохранить</button>
        <button
          onClick={() => {
            callback(privateViewStates.documents);
            setId(null);
          }}
        >
          Вернуться к списку
        </button>
      </div>
    </section>
  );
};

export default AdminEditDocument;
