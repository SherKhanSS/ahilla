import { FC } from 'react';
import styles from './private-menu.module.scss';
import { adminMenu } from '../../constants';

type PropsType = {
  currentView: string;
  onMenuItemClick: (name: string) => void;
};

const logOut = async () => {
  document.cookie = `token=null`;
  document.cookie = `view=null`;
  localStorage.removeItem('token');
  localStorage.removeItem('currentEntityId');
  return window.location.assign('/');
};

const PrivateMenu: FC<PropsType> = ({ currentView, onMenuItemClick }) => {
  return (
    <ul className={styles.list}>
      {adminMenu.map((it, i) => (
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
