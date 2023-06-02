import { Container, styled } from '@mui/material';

export const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '70vh',
  margin: '1.5em auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '700px',
  },
}));
