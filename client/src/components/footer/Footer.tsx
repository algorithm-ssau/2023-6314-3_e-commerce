import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { RightArrow } from '../RightArrow';
import { Container, Grid } from '@mui/material';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.links}>
          <div className={styles.policy}>
            <Link to="/">EXQUISITE</Link>
            <a href="#">
              Политика
              <br />
              конфиденциальности
            </a>
          </div>
          <div className={styles.navigation}>
            <Link to="/account">Личный кабинет</Link>
            <Link to="/cart">Корзина</Link>
            <Link to="/favorite">Избранное</Link>
            <Link to="/login">Вход</Link>
          </div>
          <div className={styles.catalog}>
            <Link to="catalog">
              Каталог <RightArrow />
            </Link>
          </div>
        </div>
        <div className={styles.meta}>
          <p>Сайт создан с образовательной целью</p>
          <a href="https://www.behance.net/tepless">Разработка сайта</a>
        </div>
      </div>
    </footer>
  );
};

/*
<Container>
			<Grid container maxWidth='1300px'>
				<Grid item xs={12} md={8}>
					
				</Grid>
			</Grid>
		</Container>
<footer className={styles.footer}>
	<div className='container'>
		<div className={styles.links}>
			<div className={styles.policy}>
				<Link to='/'>EXQUISITE</Link>
				<a href='#'>Политика<br />конфиденциальности</a>
			</div>
			<div className={styles.navigation}>
				<Link to='/account'>Личный кабинет</Link>
				<Link to='/cart'>Корзина</Link>
				<Link to='/favorite'>Избранное</Link>
				<Link to='/login'>Вход</Link>
			</div>
			<div className={styles.catalog}>
				<button>
					Каталог <RightArrow />
				</button>
				<Link to='/login-admin'>Вход для менеджера</Link>
			</div>
		</div>
		<div className={styles.meta}>
			<p>Сайт создан с образовательной целью</p>
			<a href='#'>Разработка сайта</a>
		</div>
	</div>
</footer>
*/
