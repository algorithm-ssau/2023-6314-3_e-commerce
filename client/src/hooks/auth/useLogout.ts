import { $api, logout } from '../../lib/api';
import { useAuth } from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  return async () => {
    console.log('useLogout: setAuth');
    console.log(setAuth);
    if (typeof setAuth === 'function') {
      setAuth({});
    }
    try {
      const response = await logout();
    } catch (err) {
      console.error(err);
    }
  };
};

export default useLogout;
