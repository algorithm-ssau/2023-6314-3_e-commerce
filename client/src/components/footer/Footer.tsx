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
          <button className={styles.btn}>Каталог</button>
        </div>
        
      </div>
      {/* <span>asdfhj</span> */}
      <div className="container footerContainer">
      <hr className={styles.line}
        
      />
      </div>
    </footer>
  );
};
