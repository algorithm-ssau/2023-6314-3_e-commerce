import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { CustomContainer } from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { register } from '../../lib/api';
import { useAuth } from '../../hooks/auth/useAuth';

export const Register = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/';

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submit() {
    if (
      newUser.password !== newUser.repeatPassword ||
      newUser.password.trim().length < 3 ||
      newUser.name.length < 2 ||
      newUser.email.length < 2
    ) {
      return toast.error('Поля заполнены некорректно.');
    }
    const response = await register(
      newUser.name,
      newUser.email,
      newUser.password,
    );

    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;
    if (typeof setAuth === 'function') {
      setAuth({ roles, accessToken });
      navigate(from, { replace: true });
    }
  }

  return (
    <CustomContainer>
      <Typography variant="h4" mb=".5em" textAlign="center">
        Регистрация
      </Typography>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Имя</FormLabel>
        <TextField value={newUser.name} name="name" onChange={handleChange} />
      </FormControl>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Почта</FormLabel>
        <TextField
          type="email"
          value={newUser.email}
          name="email"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Пароль</FormLabel>
        <TextField
          type="password"
          value={newUser.password}
          name="password"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Подтвердите пароль</FormLabel>
        <TextField
          type="password"
          value={newUser.repeatPassword}
          name="repeatPassword"
          onChange={handleChange}
        />
      </FormControl>
      <Typography variant="overline" margin="1em 0">
        <Link to="/login">Уже есть аккаунт?</Link>
      </Typography>
      <Button
        variant="outlined"
        sx={{ padding: '1em 2em', marginBottom: '2.5em' }}
        onClick={submit}
      >
        Зарегистрироваться
      </Button>
    </CustomContainer>
  );
};
