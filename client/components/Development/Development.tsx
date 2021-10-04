import { FC, useState } from 'react';
import styles from './development.module.scss';
import ArticleInner from '../ArticleInner/ArticleInner';
import { ArticleType } from '../../types';
import Spinner from '../Icons/Spinner';

const Development: FC = () => {
  return (
    <section className={styles.main}>
      <div className={styles.text}>
        Сайт находится в разработке, некоторые разделы пока недоступны
      </div>
    </section>
  );
};

export default Development;
