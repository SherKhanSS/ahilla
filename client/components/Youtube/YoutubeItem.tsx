import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './youtube.module.scss';

const YoutubeItem: FC<any> = ({ it }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <li
      className={styles.item}
      onMouseEnter={() => {
        setIsShow(true);
      }}
      onClick={() => {
        setIsShow(true);
      }}
    >
      <h3 className={styles.name}>{it.title}</h3>
      <div className={styles.video_wrap}>
        {isShow ? (
          <iframe
            title="Екатеринбург, протесты в сквере у театра драмы"
            src={it.link}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image
            className={styles.video_placeholder}
            src="/img/youtobe-back.jpg"
            alt="Заглушка для Ютуба"
            layout="responsive"
            width={300}
            height={169}
          />
        )}
      </div>
    </li>
  );
};

export default YoutubeItem;
