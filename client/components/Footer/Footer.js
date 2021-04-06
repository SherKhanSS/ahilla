import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.main}>
      <div className={styles.wrap}>
        <div className={styles.description}>
          Независимый аналитический проект «Ахилла»
          <br />
          Перепечатка материалов сайта возможна только при условии активной
          гиперссылки
        </div>
        <div className={styles.row}>
          <div className={styles.feedback}>
            <span className={styles.feedback_text}>Напишите нам:</span>
            <ul className={styles.feedback_list}>
              <li className={styles.feedback_item}>
                <a
                  className={styles.feedback_link}
                  href='mailto:ahilla.ru@gmail.com'
                >
                  ahilla.ru@gmail.com,
                </a>
              </li>
              <li className={styles.feedback_item}>
                <a className={styles.feedback_link} href='#'>
                  ВКонтакте,
                </a>
              </li>
              <li className={styles.feedback_item}>
                <a className={styles.feedback_link} href='#'>
                  Facebook,
                </a>
              </li>
              <li className={styles.feedback_item}>
                <a className={styles.feedback_link} href='#'>
                  Twitter,
                </a>
              </li>
              <li className={styles.feedback_item}>
                <a className={styles.feedback_link} href='#'>
                  Живой Журнал
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.help}>
            <span className={styles.help_description}>Помочь проекту:</span>
            <ul className={styles.help_list}>
              <li className={styles.help_item}>
                <a
                  className={styles.help_link}
                  href='https://money.yandex.ru/to/410013762179717'
                >
                  Яндекс-кошелек: 410013762179717
                </a>
              </li>
              <li className={styles.help_item}>
                <a className={styles.help_link}>
                  Карта Сбербанка: 4276 1600 2495 4340
                </a>
              </li>
              <li className={styles.help_item}>
                <a
                  className={styles.help_link}
                  href='https://www.paypal.me/helpahilla'
                >
                  PayPal
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.social}>Social</div>
        </div>
        <div className={styles.opinion}>
          Мнение авторов может не совпадать с мнением редакции. За достоверность
          информации ответственность несут авторы.
        </div>
        <div className={styles.copyright}>Copyright © 2017 Ahilla.ru</div>
      </div>
    </footer>
  )
}

export default Footer