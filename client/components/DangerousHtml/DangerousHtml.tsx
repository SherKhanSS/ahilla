import { FC } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import styles from './dangerous-html.module.scss';

export const DangerousHtml: FC<{ str: string }> = ({ str }) => {
  return (
    <div className={styles.main}
  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(str)}}
  />
  );
};
