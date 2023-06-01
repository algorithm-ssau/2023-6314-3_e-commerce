import styles from './Header.module.css';
import { IconFavorite } from '../IconFavorite/IconFavorite';
import { IconBag } from '../IconBag/IconBag';
import { IconAccount } from '../IconAccount/IconAccount';
import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { CustomToolbar } from './styles';

export const Header = () => {
  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: '#fff', color: '#000', marginBottom: '1em' }}
    >
      <div className="container">
        <CustomToolbar>
          <div className={styles.headerSection}>
            <Link className={styles.headerButton} to="/">
              EXQUISITE
            </Link>
          </div>
          <nav>
            <Link className={styles.headerItem} to="/favorite">
              <IconFavorite />
            </Link>
            <Link className={styles.headerItem} to="/cart">
              <IconBag />
            </Link>
            <Link className={styles.headerItem} to="/account">
              <IconAccount />
            </Link>
          </nav>
        </CustomToolbar>
      </div>
    </AppBar>
  );
};

// <header className={styles.header}>
// 	<div className={styles.headerSection} id='mainLogo'>
// 		<a className={styles.headerButton} href='#'>
// 			EXQUISITE
// 		</a>
// 	</div>
// 	<div className={styles.headerSection}>
// <a className={styles.headerItem} href='#'>
// 	<IconFavorite />
// </a>
// <a className={styles.headerItem} href='#'>
// 	<IconBag />
// </a>
// <a className={styles.headerItem} href='#'>
// 	<IconAccount />
// </a>
// 	</div>
// </header>
