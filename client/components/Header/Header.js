import Link from 'next/link'
import { useEffect, useState } from 'react'
import LogoIcon from '../Icons/LogoIcon'
import SearchIcon from '../Icons/SearchIcon'
import BurgerIcon from '../Icons/BurgerIcon'
import CloseIcon from '../Icons/CloseIcon'
import styles from './header.module.scss'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import MenuList from './MenuList'

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
        <Link href='/'>
          <a className={styles.logo}>
            <LogoIcon />
          </a>
        </Link>
        {isShowMenu && <MenuList styles={styles} isDesktop={isDesktop} />}
        <div className={styles.controls}>
          <Link href='/search'>
            <a className={styles.search}>
              <SearchIcon />
            </a>
          </Link>
          {!isDesktop && (
            <button
              className={styles.burger}
              onClick={() => {
                setIsShowMenu(!isShowMenu)
              }}
            >
              {isShowMenu ? <CloseIcon /> : <BurgerIcon />}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
