import { Container, Toolbar, styled } from '@mui/material';

export const CustomContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    margin: '1em 0 2em',
    paddingLeft: '0',
  },
  [theme.breakpoints.up('xs')]: {
    margin: '1em 0 2em',
    paddingLeft: '0',
  },
}));
