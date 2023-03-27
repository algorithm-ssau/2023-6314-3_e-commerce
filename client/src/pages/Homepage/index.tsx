import { Header } from "../../components/header/Header"
import styles from "./Homepage.module.css"

export const Homepage = () => {
  return (
    <div className="container">
      <Header />
        
      <main>
        <div className={styles.gridContainer}>
          <div className={styles.gridBottomPicture}>
            <img src="/homepage_main.jpg" alt="Девушка в зеркале" />
          </div>
          <div className={styles.gridTopPicture}>
            <img src="/homepage_second.jpg" alt="Рука с кольцами" />
          </div>
          <div className={styles.mainHeader}>
            <p className={styles.mainP1}>Почувствуй свою</p>
            <p className={styles.mainP2}>уникальность</p>
          </div>
          <div className={styles.mainP}>
            <p>Изысканные украшения, которые выгодно дополнят Ваш образ и подчеркнут достоинства</p>
          </div>
          <button className={styles.btnCatalog}>Каталог
            <img className={styles.btnArrow} id="btnCatalog" src="/catalog_arrow.svg" alt="" />
          </button>
        </div>

        <div>
          <p className={styles.mainP3}>Изящество - главный секрет нашего бренда</p>
        </div>
      </main>
        
    </div>
  )
}
