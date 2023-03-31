import { Header } from "../../components/header/Header"
import styles from "./Homepage.module.css"

export const Homepage = () => {
  return (
    <div className="container">
      <Header />
        
      <main>
        <div className={styles.gridHeroContainer}>
          <div className={styles.gridHeroBottomPicture}>
            <img src="/homepage_main.jpg" alt="Девушка в зеркале" />
          </div>
          <div className={styles.gridHeroTopPicture}>
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
            {/* <img className={styles.btnArrow} id="btnCatalog" src="/catalog_arrow.svg" alt="" /> */}
            <div className={styles.btnArrow}>a</div>
          </button>
        </div>
        
        <div>
          <p className={styles.mainP3}>Изящество - главный секрет нашего бренда</p>
        </div>

        <div className={styles.gridTilesContainer}>
          <div className={styles.gridTilesItem1}>
                <button className={styles.btnImg + ' ' + styles.btn1}></button>
                <button className={styles.btnText}>Серьги</button>
          </div>
          <div className={styles.gridTilesItem2}>
                <button className={styles.btnImg + ' ' + styles.btn2}></button>
                <button className={styles.btnText}>Колье</button>
          </div>
          <div className={styles.gridTilesItem3}>
                <button className={styles.btnImg + ' ' + styles.btn3}></button>
                <button className={styles.btnText}>Браслеты</button>
          </div>
          <div className={styles.gridTilesItem4}>
                <button className={styles.btnImg + ' ' + styles.btn4}></button>
                <button className={styles.btnText}>Кольца</button>
          </div>
          <div className={styles.gridTilesItem5}>
                <button className={styles.btnImg + ' ' + styles.btn5}></button>
                <button className={styles.btnText}>Sale</button>
          </div>
        </div>
      </main>
        
    </div>
  )
}
