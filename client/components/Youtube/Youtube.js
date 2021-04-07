import styles from './youtube.module.scss'

const Youtube = () => {
  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Наш канал на youtube</h2>
      <ul className={styles.list}>
        <li className={styles.item}>
          <h3 className={styles.name}>
            Екатеринбург, храм на драме, хроника протестов
          </h3>
          <div className={styles.video_wrap}>
            <iframe
              title='Екатеринбург, протесты в сквере у театра драмы'
              src='https://www.youtube.com/embed/videoseries?list=PLYFpMn8XTK_BIIaljFQPLooRxcUw_celf'
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </li>
        <li className={styles.item}>
          <h3 className={styles.name}>Походы с Ахиллой</h3>
          <div className={styles.video_wrap}>
            <iframe
              title='Походы с Ахиллой'
              src='https://www.youtube.com/embed/videoseries?list=PLYFpMn8XTK_B1c2rB955Cb3CNdPeQSvM0'
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </li>
      </ul>
    </section>
  )
}

export default Youtube
