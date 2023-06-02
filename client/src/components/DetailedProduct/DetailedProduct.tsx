import { Box, Container } from '@mui/system';
import styles from './DetailedProduct.module.css';
import { Image } from 'mui-image';
import { Button, Typography } from '@mui/material';
import { CustomContainer } from './styles';
import { useParams } from 'react-router-dom';
import { useGetOneProduct } from '../../lib/product/useProducts';

export const DetailedProduct = () => {
  const { id } = useParams();

  const { data: product, error, isLoading } = useGetOneProduct(+(id ?? -1));

  if (isLoading) return <div>Загрузка...</div>;

  if (error || !product) {
    console.log(error);
    return <div>Товар не найден</div>;
  }

  return (
    <div className={'container ' + styles.container}>
      <div className={styles.image}>
        <Image src={product.photoUrl} alt="Товар" />
      </div>
      <CustomContainer>
        <Typography variant="h4">{product.photoUrl}</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: '1em' }}>
          {product.price} ₽
        </Typography>
        <Button variant="contained" sx={{ marginBottom: '5em' }}>
          В корзину
        </Button>
        <Box>
          <Typography
            variant="h5"
            sx={{ textTransform: 'uppercase', marginBottom: '.75em' }}
          >
            Характеристики
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '60%',
            }}
          >
            <Typography variant="body1" color="#4d4d4dc4">
              Материал
            </Typography>
            <Typography
              variant="body1"
              color="#000"
              sx={{ transform: 'translateX(80%)' }}
            >
              {product.material}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '60%',
            }}
          >
            <Typography variant="body1" color="#4d4d4dc4">
              Проба
            </Typography>
            <Typography variant="body1" color="#000">
              {product.fineness}
            </Typography>
          </Box>
        </Box>
      </CustomContainer>
    </div>
  );
};
