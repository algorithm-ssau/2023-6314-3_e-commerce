import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { CustomCardMedia } from './styles';

export const CartProduct = () => {
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <Grid item xs={12} marginBottom="1.5em">
      <Card
        sx={{
          borderRadius: matches ? '1rem 1rem 0 0' : '1rem 0 0 1rem',
          display: 'flex',
          flexDirection: matches ? 'column' : 'row',
        }}
      >
        <CustomCardMedia image="../public/images/product-1.jpg" />
        <CardContent>
          <Typography variant="body1" fontSize="1.5rem">
            2 800 ₽
          </Typography>
          <Typography variant="overline">Серьги с жемчугом</Typography>
          <Box sx={{ display: 'flex' }}>
            <Button variant="contained" sx={{ backgroundColor: '#3b2d2d' }}>
              -
            </Button>
            <Typography
              variant="body1"
              sx={{ fontSize: '1.5rem', margin: '0 .6em' }}
            >
              2
            </Typography>
            <Button variant="contained" sx={{ backgroundColor: '#3b2d2d' }}>
              +
            </Button>
          </Box>
          <Typography variant="h4" sx={{ marginTop: '.5em' }}>
            5 600 ₽
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
