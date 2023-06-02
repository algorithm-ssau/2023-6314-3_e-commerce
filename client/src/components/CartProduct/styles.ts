import { CardMedia, Toolbar, styled } from '@mui/material';

export const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '10%',
  height: '35vh',
  [theme.breakpoints.up('xs')]: {
    width: '100%',
    height: '35vh',
  },
  [theme.breakpoints.up('sm')]: {
    width: '40%',
    height: '35vh',
  },
  [theme.breakpoints.up('md')]: {
    width: '40%',
    height: '35vh',
  },
  [theme.breakpoints.up('lg')]: {
    width: '40%',
    height: '35vh',
  },
}));
