import { FC } from 'react';
import styles from './private-menu.module.scss';

type PropsType = {
  menu: {
    rusName: string;
    name: string;
  }[];
  currentView: string;
  onMenuItemClick: (name: string) => void;
  logOut: () => void;
};

const PrivateMenu: FC<PropsType> = ({
  menu,
  currentView,
  onMenuItemClick,
  logOut,
}) => {
  return (
    <ul className={styles.list}>
      {menu.map((it, i) => (
        <li className={styles.item} key={i}>
          <button
            className={styles.button}
            style={
              ~currentView
                .toLowerCase()
                .indexOf(it.name.toLowerCase().slice(0, 3))
                ? { textDecoration: 'underline' }
                : {}
            }
            onClick={() => onMenuItemClick(it.name)}
          >
            {it.rusName}
          </button>
        </li>
      ))}
      <li className={styles.item} key={'logOut'}>
        <button className={styles.button} onClick={logOut}>
          Выйти
        </button>
      </li>
    </ul>
  );
};

export default PrivateMenu;
