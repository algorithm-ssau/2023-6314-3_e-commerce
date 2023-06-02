import { Container, TextField, styled } from '@mui/material';

export const CustomContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  padding: '0',
  // margin: 0,
  width: '93px',
}));

export const ResponsiveContainer = styled(Container)(({ theme }) => ({
  width: '30%',
  marginTop: '.45em',
}));
