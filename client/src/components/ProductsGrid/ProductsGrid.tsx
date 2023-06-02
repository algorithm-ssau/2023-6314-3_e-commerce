import { Grid, useMediaQuery } from '@mui/material';
import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

export const ProductsGrid = () => {
  const matches = useMediaQuery('(max-width:980px)');
  return (
    <Grid container sx={{ width: matches ? '100%' : '70%' }}>
      <ProductCard imageUrl="../public/images/product-5.jpg" />
      <ProductCard imageUrl="../public/images/product-6.jpg" />
      <ProductCard imageUrl="../public/images/product-7.jpg" />
      <ProductCard imageUrl="../public/images/product-8.jpg" />
      <ProductCard imageUrl="../public/images/product-9.jpg" />
      <ProductCard imageUrl="../public/images/product-10.jpg" />
      <ProductCard imageUrl="../public/images/product-11.jpg" />
      <ProductCard imageUrl="../public/images/product-12.jpg" />
      <ProductCard imageUrl="../public/images/product-13.jpg" />
      <ProductCard imageUrl="../public/images/product-14.jpg" />
      <ProductCard imageUrl="../public/images/product-15.jpg" />
      <ProductCard imageUrl="../public/images/product-16.jpg" />
      <ProductCard imageUrl="../public/images/product-17.jpg" />
      <ProductCard imageUrl="../public/images/product-18.jpg" />
      <ProductCard imageUrl="../public/images/product-19.jpg" />
    </Grid>
  );
};
