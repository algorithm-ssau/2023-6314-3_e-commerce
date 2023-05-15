import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { ArrowCatalog } from "../../components/HeroSectionArrow/ArrowCatalog";
import { HoverableSVG } from "../../components/HeroSectionArrow/HoverableSVG";
import { NewProducts } from "../../components/newProducts/NewProducts";
import styles from "./Homepage.module.css";

export const Homepage = () => {
  return (
    <>
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
              <p>
                Изысканные украшения, которые выгодно дополнят Ваш образ и
                подчеркнут достоинства
              </p>
            </div>
            <button className={styles.btnCatalog}>
              Каталог
              <HoverableSVG />
              {/* <ArrowCatalog /> */}
            </button>
          </div>

          <div>
            <p className={styles.mainP3}>
              Изящество - главный секрет нашего бренда
            </p>
          </div>

          <div className={styles.gridTilesContainer}>
            <div className={styles.gridTilesItem1}>
              <button className={styles.btnImg + " " + styles.btn1}></button>
              <button className={styles.btnText}>Серьги</button>
            </div>
            <div className={styles.gridTilesItem2}>
              <button className={styles.btnImg + " " + styles.btn2}></button>
              <button className={styles.btnText}>Колье</button>
            </div>
            <div className={styles.gridTilesItem3}>
              <button className={styles.btnImg + " " + styles.btn3}></button>
              <button className={styles.btnText}>Браслеты</button>
            </div>
            <div className={styles.gridTilesItem4}>
              <button className={styles.btnImg + " " + styles.btn4}></button>
              <button className={styles.btnText}>Кольца</button>
            </div>
            <div className={styles.gridTilesItem5}>
              <button className={styles.btnImg + " " + styles.btn5}></button>
              <button className={styles.btnText}>Sale</button>
            </div>
          </div>

          <div className={styles.viewAllBtn}>
            <button className={styles.btn}>Смотреть полностью</button>
          </div>

          <NewProducts />

          <div className={styles.flexAbout}>
            <div className={styles.flexPic}>
              <img src="./pic_about.jpg" alt="О нас" />
            </div>
            <div className={styles.flexText}>
              <p className={styles.mainP4}>О нас</p>
              <div className={styles.text}>
                <p className={styles.textItem}>
                  Мы — молодой бренд, который радует своих клиентов
                  качественными украшениями из драгоценных металлов.
                </p>
                <p className={styles.textItem}>
                  Наша цель заключается в том, чтобы подчеркнуть естественную
                  красоту каждой девушки и подарить чувство стиля и
                  индивидуальности.
                </p>
                <p className={styles.textItem}>
                  Чтобы выглядеть шикарно, не нужен повод. Пусть красота и
                  изящество будут постоянными спутниками Вашей жизни!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};
