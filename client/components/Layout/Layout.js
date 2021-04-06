import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SideBar from '../SideBar/SideBar'
import styles from './layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.wrap}>
          <section className={styles.content}>{children}</section>
          <SideBar />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout