import { Card, CardMedia, Grid } from '@mui/material';
import styles from './ShowCaseProduct.module.css';

export const ShowCaseProduct = () => {
  return (
    <>
      <Grid item xs={12} md={6} lg={3}>
        <Card
          sx={{
            borderRadius: '0',
            cursor: 'pointer',
          }}
        >
          <div className={styles.productImg}>
            <CardMedia
              image="./images/product-1.jpg"
              title=""
              sx={{
                height: '40vh',
                borderRadius: '0',
              }}
            />
            <div className={styles.containerNew}>
              <p className={styles.new}>New</p>
            </div>
          </div>
          <div className={styles.description}>
            <p className={styles.price}>2 800 &#8381;</p>
            <p className={styles.text}>Серьги с жемчугом</p>
          </div>
        </Card>
      </Grid>
    </>
  );
};
