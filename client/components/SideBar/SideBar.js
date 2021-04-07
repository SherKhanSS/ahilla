import styles from './sidebar.module.scss'
import Tags from '../Tags/Tags'
import Youtube from '../Youtube/Youtube'
import SocialList from '../SocialList/SocialList'
import Archives from '../Archives/Archives'
import Popular from '../Popular/Popular'
import Advertising from '../Advertising/Advertising'

const SideBar = () => {
  return (
    <section className={styles.main}>
      <Tags />
      <Youtube />
      <section className={styles.social}>
        <h2 className={styles.social_title}>Мы в соцсетях:</h2>
        <SocialList />
      </section>
      <Archives />
      <Popular />
      <Advertising />
    </section>
  )
}

export default SideBar
