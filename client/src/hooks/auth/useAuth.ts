import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';

export function useAuth() {
  // const { auth } = useContext(AuthContext);
  // useDebugValue(auth, (auth) => (auth?.user ? 'Logged In' : 'Logged Out'));
  console.log('useAuth: useContext(AuthContext)');
  console.log(useContext(AuthContext));
  return useContext(AuthContext);
}
