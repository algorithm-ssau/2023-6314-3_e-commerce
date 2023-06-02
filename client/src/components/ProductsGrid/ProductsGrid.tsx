import { Grid, useMediaQuery } from '@mui/material';
import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

export const ProductsGrid = () => {
  const matches = useMediaQuery('(max-width:980px)');
  return (
    <Grid container sx={{ width: matches ? '100%' : '70%' }}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </Grid>
  );
};
