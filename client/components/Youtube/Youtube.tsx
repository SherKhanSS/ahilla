import { FC, useState } from 'react'
import Image from 'next/image'
import styles from './youtube.module.scss'

const playList = [
  {
    title: 'Екатеринбург, протесты в сквере у театра драмы',
    link:
      'https://www.youtube.com/embed/videoseries?list=PLYFpMn8XTK_BIIaljFQPLooRxcUw_celf',
  },
  {
    title: 'Походы с Ахиллой',
    link:
      'https://www.youtube.com/embed/videoseries?list=PLYFpMn8XTK_B1c2rB955Cb3CNdPeQSvM0',
  },
]

const Youtube: FC = () => {
  const [isShow, setIsShow] = useState(false)

  return (
    <section
      className={styles.main}
      onMouseEnter={() => {
        setIsShow(true)
      }}
      onClick={() => {
        setIsShow(true)
      }}
    >
      <h2 className={styles.title}>Наш канал на youtube</h2>
      <ul className={styles.list}>
        {playList.map((it, i) => {
          return (
            <li className={styles.item} key={i}>
              <h3 className={styles.name}>{it.title}</h3>
              <div className={styles.video_wrap}>
                {isShow ? (
                  <iframe
                    title='Екатеринбург, протесты в сквере у театра драмы'
                    src={it.link}
                    frameBorder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                ) : (
                  <Image
                    className={styles.video_placeholder}
                    src='/img/youtobe-back.jpg'
                    alt='Заглушка для Ютуба'
                    layout='responsive'
                    width={300}
                    height={169}
                  />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Youtube
