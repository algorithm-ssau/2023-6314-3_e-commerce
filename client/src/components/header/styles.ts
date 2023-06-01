import { Toolbar, styled } from '@mui/material';

export const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  paddingLeft: '0',
  paddingRight: '0',
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '0',
    paddingRight: '0',
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0',
    paddingRight: '0',
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: '0',
    paddingRight: '0',
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: '0',
    paddingRight: '0',
  },
}));
