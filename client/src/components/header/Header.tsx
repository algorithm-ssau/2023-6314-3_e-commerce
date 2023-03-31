import styles from "./Header.module.css"
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
          <a className={styles.headerItem} id="favorite" href="#" >
              <IconFavorite/>
          </a>
          <a className={styles.headerItem} id="bag" href="#">
              <IconBag/>
          </a>
          <a className={styles.headerItem} id="account" href="#">
              <IconAccount/>
          </a> 
        </div>
      </header>
    
  )
}