import { FC, useEffect, useState } from 'react';
import styles from './admin-documents-table.module.scss';
import Edit from '../Icons/Edit';
import Checked from '../Icons/Checked';
import Copy from '../Icons/Copy';
import Image from 'next/image';

type OptionType = {
  id: number;
  name: string;
  slug: string;
  category: string;
  created_at: string;
  updated_at: string;
};

type PropsType = {
  options: OptionType[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleInsertImage?: (link: string) => void;
};

const AdminDocumentsTable: FC<PropsType> = ({
  options,
  handleEdit,
  handleDelete,
  handleInsertImage,
}) => {
  return (
    <div className={styles.table}>
      <ul className={styles.body}>
        {options?.map((it) => {
          const nameArr = it.slug.split('.');
          const type = nameArr[nameArr.length - 1];
          const isImage =
            type === 'jpg' ||
            type === 'jpeg' ||
            type === 'png' ||
            type === 'webp';

          return (
            <li className={styles.row} key={it.id}>
              <div
                className={styles.name}
                onClick={() => {
                  handleInsertImage !== undefined
                    ? handleInsertImage(it.slug)
                    : null;
                }}
              >
                {isImage ? (
                  <div>
                    <Image
                      className={styles.image}
                      src={it.slug}
                      alt={it.name}
                      layout="responsive"
                      width={700}
                      height={400}
                    />
                  </div>
                ) : (
                  <div className={styles.mock}>
                    <span>{`.${type}`}</span>
                  </div>
                )}
                <div className={styles.name_name}>{it.name}</div>{' '}
              </div>
              <div className={styles.buttons}>
                <div
                  className={styles.copy}
                  title="Копировать ссылку в буфер обмена"
                  onClick={async () =>
                    await navigator.clipboard.writeText(it.slug)
                  }
                >
                  <Copy />
                </div>
                <div
                  className={styles.edit}
                  title="Редактировать название"
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
          );
        })}
      </ul>
    </div>
  );
};

export default AdminDocumentsTable;
