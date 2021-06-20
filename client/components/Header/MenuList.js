import menu from './menu'
import MenuItem from './MenuItem'

const MenuList = ({ styles, isDesktop, isShowMenu }) => {
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