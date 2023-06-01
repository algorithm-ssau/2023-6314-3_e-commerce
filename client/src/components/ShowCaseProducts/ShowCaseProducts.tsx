import styles from './ShowCaseProducts.module.css';
import { ShowCaseProduct } from '../ShowCaseProduct';
import { Grid } from '@mui/material';

export const ShowCaseProducts = () => {
	return (
		<>
				<h3 className={styles.title}>Наши новинки</h3>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<ShowCaseProduct />
				<ShowCaseProduct />
				<ShowCaseProduct />
				<ShowCaseProduct />
			</Grid>
		</>
	);
};
