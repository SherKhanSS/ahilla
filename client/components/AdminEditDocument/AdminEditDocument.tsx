import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './admin-edit-document.module.scss';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';

const MAX_TITLE = 100;

const AdminEditDocument: FC<{
  currentEntityId: number | null;
  callback: (status: boolean) => void;
  setId: (id: number | null) => void;
}> = ({ currentEntityId, callback, setId }) => {
  const [name, setName] = useState('');
  const { request } = useHttp();
  const refFormData = useRef<FormData>();

  useEffect(() => {
    refFormData.current = new FormData();
  }, []);

  useEffect(() => {
    if (currentEntityId !== null) {
      (async () => {
        try {
          const document = await request(
            `${domainURL}/api/documents/${currentEntityId}`
          );
          setName(document.name);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [currentEntityId, request]);

  const handleSubmit = async () => {
    const token = localStorage.token ? localStorage.token : '';

    if (refFormData.current !== undefined) {
      refFormData.current.append('name', name);
    }

    const body = refFormData.current;

    try {
      const res =
        currentEntityId === null
          ? await fetch(`${domainURL}/api/documents`, {
              method: 'POST',
              body,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await fetch(
              `${domainURL}/api/documents/${currentEntityId}/${name}`,
              {
                method: 'PUT',
                body,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

      const { status } = await res.json();
      if (status === 201) {
        setId(null);
        callback(false);
      } else {
        alert('Что-то пошло не так');
      }
    } catch (err) {
      console.log(err);
      alert('Что-то пошло не так');
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && refFormData.current !== undefined) {
      const file = e.target.files[0];
      refFormData.current.append('file', file);
    }
  };

  return (
    <section className={styles.main_wrap}>
      <div className={styles.main}>
        {!currentEntityId && (
          <label>
            Файл
            <input type="file" onChange={handleChange} />
          </label>
        )}
        <label>
          Название файла
          <input
            type={'text'}
            value={name}
            maxLength={MAX_TITLE}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <div className={styles.buttons}>
          <button onClick={handleSubmit}>Сохранить</button>
          <button
            onClick={() => {
              setId(null);
              callback(false);
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminEditDocument;
