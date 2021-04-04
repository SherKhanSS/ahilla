import menu from './menu'
import MenuItem from './MenuItem'

const MenuList = ({ styles, isDesktop }) => {
  return (
    <nav className={styles.nav}>
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