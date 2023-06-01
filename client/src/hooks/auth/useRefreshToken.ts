import { $api } from '../../lib/api';
import { ApiResponse, TokenPayload } from '../../types';
import { useAuth } from './useAuth';
import jwt_decode from 'jwt-decode';

export const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const response = (await $api.get('/refresh-token', {
			withCredentials: true,
		})) as ApiResponse;

		if (typeof setAuth === 'function') {
			const { roles } = jwt_decode(response.data.accessToken) as TokenPayload;

			setAuth((prev) => {
				return {
					...prev,
					roles: roles,
					accessToken: response.data.accessToken,
				};
			});
		}
		return response.data.accessToken;
	};
	return refresh;
};
