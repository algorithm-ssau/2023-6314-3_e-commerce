import styles from "./Header.module.css"
import icon_bag from "./icons/images/icon_bag.svg"
import icon_favorite from "./icons/images/icon_favorite.svg"
import icon_account from "./icons/images/icon_account.svg"
import { IconAccount } from "./icons/IconAccount"
import { IconBag } from "./icons/IconBag"
import { IconFavorite } from "./icons/IconFavorite"


export const Header = () => {
  return (
    
      <header className={styles.header}>
        <div className={styles.headerSection} id="mainLogo">
          <a className={styles.headerButton} href="#">EXQUISITE</a>
        </div>
        <div className={styles.headerSection} id="icons">
          <a className={styles.headerItem + ' ' + styles.headerButton} id="favorite" href="#" >
              <IconFavorite/>
          </a>
          <a className={styles.headerItem + ' ' + styles.headerButton} id="bag" href="#">
              <IconBag/>
          </a>
          <a className={styles.headerItem + ' ' + styles.headerButton} id="account" href="#">
              <IconAccount/>
          </a> 
        </div>
      </header>
    
  )
}
