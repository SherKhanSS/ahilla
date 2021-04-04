import { useState } from 'react'
import styles from './header.module.scss'
import Link from 'next/link'

const MenuItem = ({item, isDesktop}) => {
  const [isShowSubMenu, setIsShowSubMenu] = useState(false)

  return (
    <li
      className={styles.menu_item}
      onMouseEnter={() => {
        isDesktop && !isShowSubMenu ? setIsShowSubMenu(true) : null
      }}
      onMouseLeave={() => {
        isDesktop && isShowSubMenu ? setIsShowSubMenu(false) : null
      }}
    >
      <Link href={item.link}>
        <a className={styles.menu_link}>{item.title}</a>
      </Link>
      {isShowSubMenu && item.subMenu && (
        <ul className={styles.menu_list}>
          {item.subMenu.map((it, i) => {
            return (
              <li className={styles.menu_item} key={i}>
                <Link href={it.link}>
                  <a className={styles.menu_link}>{it.title}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}

export default MenuItem