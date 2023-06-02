import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { CustomContainer } from './styles';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <CustomContainer>
      <Typography variant="h4" mb=".5em" textAlign="center">
        Регистрация
      </Typography>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Имя</FormLabel>
        <TextField></TextField>
      </FormControl>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Почта</FormLabel>
        <TextField type="email"></TextField>
      </FormControl>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Пароль</FormLabel>
        <TextField type="password"></TextField>
      </FormControl>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Подтвердите пароль</FormLabel>
        <TextField type="password"></TextField>
      </FormControl>
      <Typography variant="overline" margin="1em 0">
        <Link to="/login">Уже есть аккаунт?</Link>
      </Typography>
      <Button
        variant="outlined"
        sx={{ padding: '1em 2em', marginBottom: '2.5em' }}
      >
        Зарегистрироваться
      </Button>
    </CustomContainer>
  );
};
