import { FC, useState } from 'react'
import Link from 'next/link'
import Arrow from '../Icons/Arrow'
import { SubMenuType, MenuItemType } from './types'

type PropsType = {
  item: MenuItemType
  isDesktop: boolean
  styles: any
}

const MenuItem: FC<PropsType> = ({ item, isDesktop, styles }) => {
  const [isShowSubMenu, setIsShowSubMenu] = useState(false)

  return (
    <li
      className={styles.menu_item}
      onMouseEnter={() => {
        isDesktop && !isShowSubMenu && setIsShowSubMenu(true)
      }}
      onMouseLeave={() => {
        isDesktop && isShowSubMenu && setIsShowSubMenu(false)
      }}
    >
      <div className={styles.menu_item_arrow}>
        <Link href={item.link}>
          <a className={styles.menu_link}>{item.title}</a>
        </Link>
        {item.subMenu && (
          <button
            className={styles.arrow}
            onClick={() => {
              isDesktop ? null : setIsShowSubMenu(!isShowSubMenu)
            }}
            style={{
              transform: isShowSubMenu ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <Arrow />
          </button>
        )}
      </div>
      {item.subMenu && (
        <ul
          className={
            isShowSubMenu ? styles.submenu_list : styles.submenu_list__closed
          }
        >
          {item.subMenu.map((it: SubMenuType, i: number) => {
            return (
              <li className={styles.submenu_item} key={i}>
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
