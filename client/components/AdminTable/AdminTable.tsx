import { FC, useEffect, useState } from 'react';
import styles from './admin-table.module.scss';
import Edit from '../Icons/Edit';
import Checked from '../Icons/Checked';
import Copy from '../Icons/Copy';

type OptionType =  { name: string; id: number; slug: string; date: string; is_published?: boolean }

type PropsType = {
  options: OptionType[];
  isPublications: boolean;
  isFiles?: boolean;
  handlePublished: (id: number) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
};

const getStatus = (publication: OptionType): string => {
  const currentTime = Date.now();
  const publicationTime = +new Date(publication.date);
  let status;
  if(publication.is_published && currentTime > publicationTime) {
    status = 'Опубликовано'
  } else if(publication.is_published && currentTime < publicationTime) {
    status = 'Запланирована публикация'
  } else if(!publication.is_published) {
    status = 'Черновик'
  } else {
    status = 'Неизвестно'
  }
  return status
}

const AdminTable: FC<PropsType> = ({
  options,
  isPublications,
  isFiles,
  handlePublished,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className={styles.table}>
      <ul className={styles.body}>
        {options?.map((it) => (
          <li className={styles.row} key={it.id}>
            <div className={styles.name}>
              <span>{it.name}</span>{' '}
              {isPublications && <sup>{getStatus(it)}</sup>}</div>
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
              {isFiles && (
                <div
                  className={styles.copy}
                  title="Копировать ссылку в буфер обмена"
                  onClick={async () => await navigator.clipboard.writeText(it.slug)}
                >
                  <Copy />
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
