import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';

export const Account = () => {
  const matches = useMediaQuery('(max-width:730px)');
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: matches ? '100%' : '60%',
        margin: '2.5em auto 5em',
      }}
    >
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        Аккаунт
      </Typography>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Имя</FormLabel>
        <TextField value={'Лев Нефедов'}></TextField>
      </FormControl>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Почта</FormLabel>
        <TextField disabled value={'nefedov.lewa@gmail.com'}></TextField>
      </FormControl>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: matches ? 'column' : 'row',
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: 'red',
            borderColor: 'red',
            marginBottom: '1em',
            width: matches ? '100%' : '45%',
          }}
        >
          Выйти
        </Button>
        <Button
          variant="contained"
          sx={{
            color: '#fff',
            backgroundColor: 'red',
            marginBottom: '1em',
            width: matches ? '100%' : '45%',
          }}
        >
          Удалить аккаунт
        </Button>
      </Box>
    </Container>
  );
};
