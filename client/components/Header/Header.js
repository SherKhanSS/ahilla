import Link from 'next/link'
import { useEffect, useState } from 'react'
import LogoIcon from '../Icons/LogoIcon'
import SearchIcon from '../Icons/SearchIcon'
import BurgerIcon from '../Icons/BurgerIcon'
import CloseIcon from '../Icons/CloseIcon'
import styles from './header.module.scss'
import menu from './menu'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import MenuItem from './MenuItem'

const DESCTOP_WIDTH = 1279

const Header = () => {
  const { width } = useWindowDimensions()
  const [isDesktop, setIsDesktop] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(isDesktop)

  useEffect(() => {
    const isDesktop = width > DESCTOP_WIDTH
    setIsDesktop(isDesktop)
    setIsShowMenu(isDesktop)
  }, [width])

  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <div className={styles.logo}>
          <Link href='/'>
            <a className={styles.logo_link}>
              <LogoIcon />
            </a>
          </Link>
        </div>
        {isShowMenu && (
          <nav className={styles.nav}>
            <ul className={styles.menu_list}>
              {menu.map((it, i) => {
                return (
                  <MenuItem item={it} isDesktop={isDesktop} key={i} />
                )
              })}
            </ul>
          </nav>
        )}
        <div className={styles.search}>
          <SearchIcon />
        </div>
        {!isDesktop && (
          <button
            onClick={() => {
              setIsShowMenu(!isShowMenu)
            }}
          >
            {isShowMenu ? <CloseIcon /> : <BurgerIcon />}
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
