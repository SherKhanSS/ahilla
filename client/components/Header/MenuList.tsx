import { FC } from 'react';
import menu from './menu';
import MenuItem from './MenuItem';
import styles from './header.module.scss';

type PropsType = {
  isShowMenu: boolean;
};

const MenuList: FC<PropsType> = ({ isShowMenu }) => {
  return (
    <nav className={isShowMenu ? styles.nav : styles.nav__closed}>
      <ul className={styles.menu_list}>
        {menu.map((it, i) => {
          return <MenuItem item={it} key={i} />;
        })}
      </ul>
    </nav>
  );
};

export default MenuList;
