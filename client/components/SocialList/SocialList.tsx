import { FC } from 'react'
import styles from './sociallist.module.scss'
import Link from 'next/link'
import {
  FBIcon,
  IGIcon,
  JJIcon,
  TGIcon,
  TVIcon,
  VKIcon,
  YUIcon,
} from '../Icons/SocialIcons'

const socials = [
  {
    icon: <FBIcon />,
    link: '/',
  },
  {
    icon: <VKIcon />,
    link: '/',
  },
  {
    icon: <TGIcon />,
    link: '/',
  },
  {
    icon: <TVIcon />,
    link: '/',
  },
  {
    icon: <JJIcon />,
    link: '/',
  },
  {
    icon: <IGIcon />,
    link: '/',
  },
  {
    icon: <YUIcon />,
    link: '/',
  },
]

const Social: FC = () => {
  return (
    <ul className={styles.list}>
      {socials.map((it, i) => {
        return (
          <li className={styles.item} key={i}>
            <Link href={it.link}>
              <a className={styles.link}>{it.icon}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Social
