import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styles from './admin-edit-publication-preview.module.scss';
import OnePublication from '../OnePublication/OnePublication';
import { domainURL, privateViewStates } from '../../constants';
import { useHttp } from '../../hooks/http';

const initial = {
  name: '',
  author: {
    name: '',
    id: 0,
    slug: '',
  },
  image: '',
  date: '',
  content: '',
  views: 0,
  description: '',
  author_id: 0,
};

const AdminEditPublicationPreview: FC<{
  currentEntityId: number | null;
  callback: (view: string) => void;
  setId: (id: number | null) => void;
}> = ({ currentEntityId, callback, setId }) => {
  const [publication, setPublication] = useState(initial);
  const { request } = useHttp();

  useEffect(() => {
    (async () => {
      try {
        const article = await request(
          `${domainURL}/api/publications/id/${currentEntityId}`
        );
        setPublication(article);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentEntityId, request]);

  return (
    <section className={styles.main}>
      <OnePublication
        id={0}
        slug={''}
        is_news={false}
        is_published={false}
        created_at={''}
        updated_at={''}
        tags={[]}
        {...publication}
      />
      <div className={styles.buttons}>
        <button
          onClick={() => {
            callback(privateViewStates.editPublication);
          }}
        >
          В редактор
        </button>
        <button
          onClick={() => {
            setId(null);
            callback(privateViewStates.editPublication);
          }}
        >
          К списку публикаций
        </button>
      </div>
    </section>
  );
};

export default AdminEditPublicationPreview;
