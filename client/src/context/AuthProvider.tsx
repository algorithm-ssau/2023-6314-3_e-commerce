import { ReactNode, createContext, useState } from 'react';
import { AuthState, IUser } from '../types';

const AuthContext = createContext<{
	auth: Partial<AuthState>;
	setAuth?: React.Dispatch<React.SetStateAction<Partial<AuthState>>>;
}>({ auth: {} });

type AuthProviderProps = {
	readonly children?: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [auth, setAuth] = useState<Partial<AuthState>>({});
	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
