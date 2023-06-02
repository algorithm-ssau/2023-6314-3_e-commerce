import { Container, Grid, Typography } from '@mui/material';
import styles from './RecommendedProducts.module.css';
import { ProductsGrid } from '../ProductsGrid';
import { ProductCard } from '../ProductCard';

export const RecommendedProducts = () => {
  return (
    <Container>
      <div className="container">
        <Typography variant="h4" sx={{ width: '100%', marginTop: '1em' }}>Другие товары</Typography>
        <Grid container sx={{ width: '100%', marginBottom: '1em' }}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Grid>
      </div>
    </Container>
  );
};
