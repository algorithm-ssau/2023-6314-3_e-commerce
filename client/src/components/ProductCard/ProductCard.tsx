import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';

export const ProductCard = () => {
  const matches = useMediaQuery('(max-width:980px)');
  return (
    <Grid
      item
      xs={12}
      sm={matches ? 5.65 : 12}
      md={matches ? 5.75 : 5.6}
      lg={3.75}
      sx={{ margin: '.5em' }}
    >
      <Card
        sx={{
          borderRadius: '0',
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          alt="product"
          height={260}
          image="../public/images/home__new-product-1.jpg"
        />
        <CardContent>
          <Typography variant="body1" fontSize="1.5rem">
            2 800 ₽
          </Typography>
          <Typography variant="overline">Серьги с жемчугом</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
