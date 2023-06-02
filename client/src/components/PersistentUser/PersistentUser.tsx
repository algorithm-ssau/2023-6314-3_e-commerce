import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRefreshToken } from '../../hooks/auth/useRefreshToken';
import { useAuth } from '../../hooks/auth/useAuth';

export const PersistentUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  console.log('PersistentUser: auth');
  console.log(auth);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        console.log('PersistentUser: verifyRefreshToken');
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    console.log('PersistentUser: !auth?.accessToken || !auth.roles');
    console.log(!auth?.accessToken || !auth.roles);
    console.log(auth?.accessToken);
    console.log(auth.roles);
    !auth?.accessToken || !auth.roles
      ? verifyRefreshToken()
      : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};
