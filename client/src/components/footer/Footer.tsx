import { HoverableSVG } from "../HeroSectionArrow/HoverableSVG";
import styles from "./Footer.module.css";


export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container footerContainer">
        <div className={styles.footerSection + " " + styles.footerLogo}>
          {/* <div className={styles.footerLogo}> */}
          <a href="#">EXQUISITE</a>
          {/* </div> */}
        </div>
        <div className={styles.footerSection}>
          <a className={styles.footerItem} href="#">
            Личный кабинет
          </a>
          <a className={styles.footerItem} href="#">
            Корзина
          </a>
          <a className={styles.footerItem} href="#">
            Избранное
          </a>
          <a className={styles.footerItem} href="#">
            Контакты
          </a>
        </div>
        <div className={styles.footerSection}>
          <button className={styles.btn}>Каталог
          <HoverableSVG />
          </button>
          
        </div>
        
      </div>
      {/* <span>asdfhj</span> */}
      <div className={"container footerContainer " + styles.middleContainer}>
        <a className={styles.footerLink} href="#"> Политика конфиденциальности </a>
        <a className={styles.footerLink} href="#"> Вход для менеджера  </a>

      </div>
      <div className={"container footerContainer " + styles.middleContainer}>
        <hr className={styles.line}      
        />
      </div>
      <div className={"container footerContainer " + styles.middleContainer}>
        <a className={styles.footerLink2} href="#"> Сайт создан с образовательной целью </a>
        <a className={styles.footerLink2} href="https://www.behance.net/tepless"> Разработка сайта  </a>

      </div>
    </footer>
  );
};
