import { FC } from 'react';
import styles from './sociallist.module.scss';
import Link from 'next/link';
import {
  FBIcon,
  IGIcon,
  JJIcon,
  TGIcon,
  TVIcon,
  VKIcon,
  YUIcon,
  YZIcon,
} from '../Icons/SocialIcons';

const socials = [
  {
    name: 'Фейсбук',
    icon: <FBIcon />,
    link: 'https://www.facebook.com/groups/ahilla/',
  },
  {
    name: 'Вконтакте',
    icon: <VKIcon />,
    link: 'https://vk.com/ahilla_ru',
  },
  {
    name: 'Телеграм',
    icon: <TGIcon />,
    link: 'https://t.me/ahilla_ru',
  },
  {
    name: 'Твиттер',
    icon: <TVIcon />,
    link: 'https://twitter.com/ahilla_ru',
  },
  {
    name: 'Живой журнал',
    icon: <JJIcon />,
    link: 'https://ahilla-ru.livejournal.com/',
  },
  {
    name: 'Инстаграмм',
    icon: <IGIcon />,
    link: 'https://www.instagram.com/ahilla.ru/',
  },
  {
    name: 'Ютуб',
    icon: <YUIcon />,
    link: 'https://www.youtube.com/c/%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B5%D0%B9%D0%9F%D0%BB%D1%83%D0%B6%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2',
  },
  {
    name: 'Яндекс Дзен',
    icon: <YZIcon />,
    link: 'https://zen.yandex.ru/ahilla',
  },
];

const Social: FC = () => {
  return (
    <ul className={styles.list}>
      {socials.map((it, i) => {
        return (
          <li className={styles.item} key={i}>
            <Link href={it.link}>
              <a className={styles.link}>
                {it.icon}
                <span className={'visually-hidden'}>{it.name}</span>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Social;
