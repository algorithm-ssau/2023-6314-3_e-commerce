import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './Layout.module.css';

export const Layout = () => {
	return (
		<div className={styles.container}>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};
