import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';

type ProductCardProps = {
  imageUrl: string;
}

export const ProductCard = ({ imageUrl }: ProductCardProps) => {
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
          image={imageUrl}
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
