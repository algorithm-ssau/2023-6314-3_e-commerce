import { Outlet } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import { useRefreshToken } from '../../hooks/auth/useRefreshToken';
import { useAuth } from '../../hooks/auth/useAuth';

export const PersistentUser = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useLayoutEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		// persist added here AFTER tutorial video
		// Avoids unwanted call to verifyRefreshToken
		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

		return () => {
			isMounted = false;
		};
	}, []);

	return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};
