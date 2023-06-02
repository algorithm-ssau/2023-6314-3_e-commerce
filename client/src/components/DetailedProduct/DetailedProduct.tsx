import { Box, Container } from '@mui/system';
import styles from './DetailedProduct.module.css';
import { Image } from 'mui-image';
import { Button, Typography } from '@mui/material';
import { CustomContainer } from './styles';

export const DetailedProduct = () => {
  return (
    <div className={'container ' + styles.container}>
      <div className={styles.image}>
        <Image src="./../images/home__new-product-1.jpg" alt="Товар" />
      </div>
      <CustomContainer>
        <Typography variant="h4">Серьги из золоченого серебра</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: '1em' }}>
          2 600 ₽
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
              Золочёное серебро
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
              985
            </Typography>
          </Box>
        </Box>
      </CustomContainer>
    </div>
  );
};
