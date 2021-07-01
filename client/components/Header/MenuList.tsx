import { FC } from 'react'
import menu from './menu'
import MenuItem from './MenuItem'

type PropsType = {
  isShowMenu: boolean
  isDesktop: boolean
  styles: any
}

const MenuList: FC<PropsType> = ({ styles, isDesktop, isShowMenu }) => {
  return (
    <nav className={isShowMenu ? styles.nav : styles.nav__closed}>
      <ul className={styles.menu_list}>
        {menu.map((it, i) => {
          return (
            <MenuItem item={it} isDesktop={isDesktop} styles={styles} key={i} />
          )
        })}
      </ul>
    </nav>
  )
}

export default MenuList