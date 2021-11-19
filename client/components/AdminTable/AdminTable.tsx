import { FC } from 'react';
import styles from './admin-table.module.scss';
import Edit from '../Icons/Edit';
import Checked from '../Icons/Checked';

type OptionType = {
  name: string;
  id: number;
  slug: string;
  date: string;
  is_published?: boolean;
};

type PropsType = {
  options: OptionType[];
  isPublications: boolean;
  handlePublished: (id: number) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
};

const getStatus = (publication: OptionType): string => {
  const currentTime = Date.now();
  const publicationTime = +new Date(publication.date);
  let status;
  if (publication.is_published && currentTime > publicationTime) {
    status = 'Опубликовано';
  } else if (publication.is_published && currentTime < publicationTime) {
    status = 'Запланирована публикация';
  } else if (!publication.is_published) {
    status = 'Черновик';
  } else {
    status = 'Неизвестно';
  }
  return status;
};

const AdminTable: FC<PropsType> = ({
  options,
  isPublications,
  handlePublished,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className={styles.table}>
      <ul className={styles.body}>
        {options?.map((it) => (
          <li className={styles.row} key={it.id}>
            <div
              className={styles.name}
              onClick={() => {
                handleEdit(it.id);
              }}
            >
              <span>{it.name}</span>{' '}
              {isPublications && <sup>{getStatus(it)}</sup>}
              {isPublications && <sup> {it.date.slice(0, 10)}</sup>}
            </div>
            <div className={styles.buttons}>
              {isPublications && (
                <div
                  className={styles.published}
                  title="Опубликовать/снять с публикации"
                  style={it.is_published ? { opacity: '1' } : { opacity: '.1' }}
                  onClick={() => {
                    handlePublished(it.id);
                  }}
                >
                  <Checked />
                </div>
              )}
              <div
                className={styles.edit}
                title="Редактировать"
                onClick={() => {
                  handleEdit(it.id);
                }}
              >
                <Edit />
              </div>
              <div
                className={styles.delete}
                title="Удалить"
                onClick={() => {
                  let isConfirm = confirm(
                    'Вы уверены в том, что хотите удалить выбранный элемент?'
                  );
                  if (!isConfirm) {
                    return;
                  }
                  handleDelete(it.id);
                }}
              >
                +
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTable;
