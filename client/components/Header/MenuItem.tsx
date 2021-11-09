import { FC } from 'react';
import Link from 'next/link';
import { MenuItemType } from './types';
import styles from './header.module.scss';

type PropsType = {
  item: MenuItemType;
};

const MenuItem: FC<PropsType> = ({ item }) => {
  return (
    <li className={styles.menu_item}>
      <div className={styles.menu_item_arrow}>
        <Link href={item.link}>
          <a className={styles.menu_link}>{item.title}</a>
        </Link>
      </div>
    </li>
  );
};

export default MenuItem;
