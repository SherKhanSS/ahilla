import { FC } from 'react';
import styles from './youtube.module.scss';
import YoutubeItem from './YoutubeItem';

const playList = [
  {
    title: 'Екатеринбург, протесты в сквере у театра драмы',
    link: 'https://www.youtube.com/embed/videoseries?list=PLYFpMn8XTK_BIIaljFQPLooRxcUw_celf',
  },
  {
    title: 'Походы с Ахиллой',
    link: 'https://www.youtube.com/embed/videoseries?list=PLYFpMn8XTK_B1c2rB955Cb3CNdPeQSvM0',
  },
];

const Youtube: FC = () => {
  return (
    <section className={styles.main}>
      <h2 className={styles.title}>Наш канал на youtube</h2>
      <ul className={styles.list}>
        {playList.map((it, i) => {
          return <YoutubeItem it={it} key={i} />;
        })}
      </ul>
    </section>
  );
};

export default Youtube;
