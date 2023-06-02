import {
  FormControl,
  FormLabel,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { CustomContainer } from './styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, ChangeEvent } from 'react';
import toast from 'react-hot-toast';
import { login } from '../../lib/api';
import { useAuth } from '../../hooks/auth/useAuth';

export const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/';

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setLoginUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submit() {
    if (loginUser.password.trim().length < 3 || loginUser.email.length < 2) {
      return toast.error('Поля заполнены некорректно.');
    }

    const response = await login(loginUser.email, loginUser.password);

    const accessToken = response?.accessToken;
    const roles = response?.roles;
    console.log('Login: accessToken');
    console.log(accessToken);
    console.log('Login: roles');
    console.log(roles);
    console.log('Login: setAuth checking');
    console.log(setAuth);
    if (typeof setAuth === 'function') {
      console.log('Login: setAuth is function');
      setAuth({ roles, accessToken });
      navigate(from, { replace: true });
    }
  }
  return (
    <CustomContainer>
      <Typography variant="h4" mb=".5em" textAlign="center">
        Вход
      </Typography>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Почта</FormLabel>
        <TextField
          type="email"
          name="email"
          value={loginUser.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl sx={{ marginBottom: '1.5em' }}>
        <FormLabel>Пароль</FormLabel>
        <TextField
          type="password"
          name="password"
          value={loginUser.password}
          onChange={handleChange}
        />
      </FormControl>
      <Typography variant="overline" margin="1em 0">
        <Link to="/register">Нет аккаунта?</Link>
      </Typography>
      <Button
        variant="outlined"
        sx={{ padding: '1em 2em', marginBottom: '2.5em' }}
        onClick={submit}
      >
        Войти
      </Button>
    </CustomContainer>
  );
};
